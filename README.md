# Card Game Maker

A deck prototyping tool made with Vue.js and Firebase

## Installation

Inside `js/`, add `db.js` with the following after setting up a firebase realtime database:

```
// Initialize Firebase
const config = {
    apiKey: <YOUR API KEY>,
    authDomain: <YOUR AUTH DOMAIN,
    databaseURL: <YOUR DB URL>,
    projectId: <YOUR PROJECT ID,
    storageBucket: <YOUR STORAGE BUCKET,
    messagingSenderId: <YOUR MESSAGING SENDER ID>
};
firebase.initializeApp(config);
let db = firebase.database();

let decksRef = db.ref('/decks')
let cardsRef = db.ref('/cards')
```