const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");
const app = express();
admin.initializeApp({
    authDomain: "data-visual-970ac.firebaseapp.com",
    databaseURL: "https://data-visual-970ac-default-rtdb.firebaseio.com"
});
// const serviceAccount = require("../../../serviceAccountKey.json");
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://data-visual-970ac-default-rtdb.firebaseio.com",
//   });
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
app.post("/create-leader", (req, res) => {
    
        const user = {
            email: req.body.email,
            fullName: req.body.fullName,
            role: "leader",
            userId: ""
        }
        admin.auth().createUser(req.body.email, req.body.password)
        .then((userCredential) => {
            // Signed in 
            user.userId = userCredential.user.userId;
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
          });
        console.log(user);
        admin.firestore().collection('users').add(user);
        return res.status(201).send(user);
});
exports.user = functions.https.onRequest(app);
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
