import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import firebase, {auth, provider} from '../firebase.js';

//import post item click action
import postItemButton from '../actions/post_item_button';
import availableItemsButton from '../actions/available_items'

//import nested containters
import Item from '../containers/item'
import PostForm from '../containers/post_form'

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
        if(this.props.renderSelector == 'POST_NEW_ITEM' && this.state.user) {
            return (
                <PostForm />
            );
        }
        else if(this.props.renderSelector == 'AVAILABLE_ITEMS' && this.state.user) {
            return (
                <Item />
            );         
        }
    }

    loginButtonSelector() {}
    
    render() {

        console.log(this.state.user);
        return (
            <div className="animated fadeInDown">
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
                                    ? <a id="auth-button" onClick={this.logout}>Log out of <img src="../../assets/web/vector/btn_google_light_pressed_ios.svg"/></a>
                                    : <a id="auth-button" onClick={this.login}>Sign in with <img src="../../assets/web/vector/btn_google_light_normal_ios.svg"/></a>
                                }
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="row animated fadeIn">
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