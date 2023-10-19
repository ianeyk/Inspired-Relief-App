import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const geofire = require('geofire-common'); 

import firebase_config from './firebase_config.json'

let app = firebase.initializeApp(firebase_config.firebase_config);
let db = firebase.firestore(app);

import { get_location } from './get_location';

const radiusInM = 50 * 1000;

function filter_false_loc(doc,center): boolean{
    const lat = doc.get('lat');
    const lng = doc.get('long');
    // We have to filter out a few false positives due to GeoHash
    // accuracy, but most will match
    const distanceInKm = geofire.distanceBetween([lat, lng], center);
    const distanceInM = distanceInKm * 1000;
    return distanceInM <= radiusInM;
}

export async function get_data(center: number[]){
    // var loc = await get_location();
    // const loc = null
    // if (loc?.coords?.latitude == null) { loc.coords.latitude = 0; loc.coords.longitude = 0; }

    

    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises: Promise<firebase.firestore.QuerySnapshot>[] = [];
    for (const b of bounds) {
        const q = db.collection('helpers').orderBy('loc').limit(20);
        // console.log((await q.get()).docs.forEach(doc => console.log(doc.data())))
        promises.push(q.get());
    }

    let data: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>[] = [];
    // Collect all the query results together into a single list
    await Promise.all(promises).then((snapshots) => {
    for (const snap of snapshots) {
        data = data.concat(snap.docs);
    }
    // filter false location positives
        data = data.filter(doc => filter_false_loc(doc, center));
    })
    return await data.map(doc => doc.data());
}