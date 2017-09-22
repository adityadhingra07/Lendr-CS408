import firebase from 'firebase'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCSl0jWkPFFvA34DfjBvo24TiIetyYNRgc",
    authDomain: "cs408-lendr.firebaseapp.com",
    databaseURL: "https://cs408-lendr.firebaseio.com",
    projectId: "cs408-lendr",
    storageBucket: "cs408-lendr.appspot.com",
    messagingSenderId: "434952035959"
};

firebase.initializeApp(config);

//Export GoogleAuth and auth module
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;