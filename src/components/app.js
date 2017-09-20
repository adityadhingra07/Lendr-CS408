import React, {Component} from 'react';
import firebase, {auth, provider} from '../firebase.js';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            items: [],
            user: null
        }

        this.login = this
            .login
            .bind(this);
        this.logout = this
            .logout
            .bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({user});
            }
        });
    }

    handleChange(e) {}

    logout() {
        auth
            .signOut()
            .then(() => {
                this.setState({user: null});
            });
    }

    login() {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({user});
            });
    }

    render() {

        console.log(this.state.user);
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Lendr</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li>
                                {this.state.user
                                    ? <a id="auth-button" onClick={this.logout}>Logout</a>
                                    : <a id="auth-button" onClick={this.login}>Log In</a>
                                }
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="row">
                    <div className="col m12">
                        {this.state.user
                            ? <p> Hello {this.state.user.displayName}!</p>
                            : <div></div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
