import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import firebase, {auth, provider} from '../firebase.js';

//import post item click action
import postItemButton from '../actions/post_item_button';
import availableItemsButton from '../actions/available_items'

class App extends Component {

    constructor(props) {
        super(props);

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

        this.renderSelection = this.renderSelection.bind(this);
        this.postItem = this.postItem.bind(this);
        this.availableItems = this.availableItems.bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({user});
            }
        });
    }

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

    postItem() {
        this.props.postItemButton();
    }

    availableItems() {
        this.props.availableItemsButton();
    }

    renderSelection() {
        console.log("epic:", this.props);
        if(this.props.renderSelector == 'POST_NEW_ITEM') {
            return (
                <div id="new-post-holder" className="row">
                    <div className="col m12">
                        <div id="new-post-form">
                            <div className="card-panel teal center-align ">
                                <span className="white-text">
                                    ADD A NEW POST FOR SALE/RENT!
                                </span>
                            </div> 
                        </div>                       
                    </div>
                </div>
            );
        }
        else if(this.props.renderSelector == 'AVAILABLE_ITEMS') {
            return (
                <div id="new-post-holder" className="row">
                    <div className="col m12">
                        <div id="new-post-form">
                            <div className="card-panel teal center-align ">
                                <span className="white-text">
                                    NEW POSTS HERE!
                                </span>
                            </div> 
                        </div>                       
                    </div>
                </div>
            );         
        }
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
                                <a onClick={this.postItem}> Post Items </a>
                            </li>
                            <li>
                                <a onClick={this.availableItems}> Available Items </a>
                            </li>
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
                            ? 
                                <div id="name-card" className="card-panel teal">
                                    <span className="white-text">
                                        Welcome back {this.state.user.displayName}!
                                    </span>
                                </div>
                            
                            : <div></div>
                        }
                    </div>
                </div>
                
                { this.renderSelection() }

            </div>
        );
    }
}


const mapStateToProps = ({ centralReducer }) => {
    return {
        renderSelector: centralReducer.renderSelector
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ postItemButton, availableItemsButton }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);