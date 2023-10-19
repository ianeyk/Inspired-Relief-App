import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
// Geolocation.requestAuthorization();
export function get_location() {
    let pos: null | GeolocationResponse = null;
    Geolocation.getCurrentPosition((position) => {
        pos = position;
    });
    return pos;
}
