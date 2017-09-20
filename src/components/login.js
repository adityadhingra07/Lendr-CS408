import React, { Component } from 'react'
import { googlelogin } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import * as firebaseui from 'firebaseui'

var uiConfig = {
    signInSuccessUrl: '',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebaseAuth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebaseAuth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

export default class Login extends Component {
    render() {
        return (
            <div id="firebaseui-auth-container"></div>
        )
    }
}