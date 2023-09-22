//import firebase from 'firebase/app'
import 'firebase/storage'
import * as fire from "firebase";
import "firebase/firestore";

 // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB2U0jcJDe0CI3TBUvQjL10ep3tuNGlbck",
    authDomain: "free-market-ae7b2.firebaseapp.com",
    databaseURL: "gs://free-market-ae7b2.appspot.com/",
    projectId: "free-market-ae7b2",
    storageBucket: "free-market-ae7b2.appspot.com",
    messagingSenderId: "927951622154",
    appId: "1:927951622154:web:577335d84245cef4d18ff3",
    measurementId: "G-DV2EWN2CVM"};

// Initialize Firebase
fire.initializeApp(firebaseConfig);
const storage = fire.storage()

//export default firebase.firestore();
var firebase1 = fire.firestore();

export  {
    storage, firebase1 as default
}

