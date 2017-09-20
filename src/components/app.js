import React, { Component } from 'react';
import Login from './login';
import { firebaseAuth } from '../config/constants'





export default class App extends Component {

  constructor(props) {
    super(props);
  }

    componentWillMount() {

        firebaseAuth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(user);
            } else {
                // No user is signed in.
            }
        });

    }

    render() {
      return (
          <div>React simple starter
            <Login />
          </div>
      );
  }
}
