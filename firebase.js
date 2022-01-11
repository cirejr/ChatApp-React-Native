import * as firebase from 'firebase';

import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBM0AnSVYSepCSr2f0iRcfh2yxMAbVTagw",
    authDomain: "mysignal-3d603.firebaseapp.com",
    projectId: "mysignal-3d603",
    storageBucket: "mysignal-3d603.appspot.com",
    messagingSenderId: "377550069977",
    appId: "1:377550069977:web:eb3aa0c1c355817fb89ec8"
};

let app;

if (firebase.apps.length===0){
    app = firebase.initializeApp(firebaseConfig)
}else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth}