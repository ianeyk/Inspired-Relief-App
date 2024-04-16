# Inspired-Relief-App

Fork for DREAM in Spring 2024

## Overview

As of April 2024, this project consists of a simple web app hosted on Google's
[Firebase](https://console.firebase.google.com/u/0/) platform. Contact the
contributors to this repo for login credentials to the test server.

Firebase is a powerful, free (up to a certain high volume of traffic) app
hosting platform with access to databases, authentication services, and
distribution platforms. In short, every major requirement for a basic app.

[This is how data storage works in firebase (Firestore object)](https://firebase.google.com/docs/firestore/data-model).

We are using the “Web namespaced API” syntax for our code. Initializing the
database and querying it looks like this:

```
let db = firebase.firestore(app);
const q = db.collection('helpers').orderBy('loc').limit(20);
```

[Go to this link to update the data in the database](https://console.firebase.google.com/u/0/project/mental-health-equity/firestore/data/~2F):

[Go to this link to update firestore permissions.](https://console.firebase.google.com/u/0/project/mental-health-equity/firestore/rules)

You need to change the date on this line to have a timestamp that is in the
future.

```
allow read, write: if request.time < timestamp.date(2024, 5, 20);
```
