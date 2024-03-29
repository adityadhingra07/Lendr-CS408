import { ref, firebaseAuth } from '../config/constants'

export function auth (email, pw) {
    return firebaseAuth().createUserWithEmailAndPassword(email, pw)
        .then(saveUser)
}

export function logout () {
    return firebaseAuth().signOut()
}

export function googlelogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithRedirect(provider);
}

export function emaillogin (email, pw) {
    return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
    return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
    return ref.child(`users/${user.uid}/info`)
        .set({
            email: user.email,
            uid: user.uid
        })
        .then(() => user)
}