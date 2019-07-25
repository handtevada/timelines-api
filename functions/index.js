const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

exports.getTimelinesList = functions.https.onRequest((request, response) => {
    let _data = [];
    cors(request, response, () => { });
    var ref = db.collection('timelines');
    var query = ref.orderBy('name').get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                response.send(_data);
            }

            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                _data.push(doc.data());
            });

            response.send(_data);
        })
        .catch(err => {
            console.log('Error getting documents', err);
            response.send(_data);
        });
});








