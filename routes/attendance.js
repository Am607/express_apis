
const router = require('express').Router()

var admin = require("firebase-admin");

var serviceAccount = require("/home/akbar/Desktop/study/nodejsstudy/node/env/eclassroom-ec4e5-firebase-adminsdk-jn6yv-84d579f678.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore(); 

let collectionRef = db.collection('attendance');



  router.post('/' ,async (req, res) => {
       var body = req.body;
       console.log(body)

       const newData ={ ...body, date: new Date()}

       collectionRef.add(newData).then(documentReference => {
             console.log('Data Succesfuly Added')
      });

    res.send(body);
  })

  




module.exports = router