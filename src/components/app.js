import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase, {auth, provider} from '../firebase.js';

//import post item click action
import postItemButton from '../actions/post_item_button';
import availableItemsButton from '../actions/available_items';
import userItemsButton from '../actions/user_items';
import editItemButton from '../actions/edit_item_button';

//import components
import NavBar from './nav_bar';

//import nested containters
import Items from '../containers/items';
import UserItems from '../containers/user_items';
import PostForm from '../containers/post_form';
import EditItem from '../containers/edit_item';
import NoUserItems from '../containers/no_user_items';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            items: [],
            user: null
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.renderSelection = this.renderSelection.bind(this);
        this.postItem = this.postItem.bind(this);
        this.availableItems = this.availableItems.bind(this);
	      this.userItems = this.userItems.bind(this);
	      this.editItem = this.editItem.bind(this);
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

    editItem(item) {
    	this.props.editItemButton(item);
    }

    availableItems() {
        this.props.availableItemsButton();
    }

    userItems() {
    	this.props.userItemsButton();
    }

    renderSelection() {
        if (this.props.renderSelector == 'POST_NEW_ITEM' && this.state.user) {
            return (
                <PostForm userName={this.state.user} availableItems={this.availableItems} />
            );
        }
        else if (this.props.renderSelector == 'AVAILABLE_ITEMS' && this.state.user) {
				return (
					<Items userName={this.state.user}/>
				);
        }
		else if (this.props.renderSelector == 'AVAILABLE_ITEMS') {
            return (
                <NoUserItems />
            );
        }

        else if (this.props.renderSelector == 'USER_ITEMS' && this.state.user) {
            return (
                <UserItems userName={this.state.user} edit={this.editItem} />
            );
        }
	else if (this.props.renderSelector == 'EDIT_ITEM' && this.state.user) {
	    return (
		<EditItem userName={this.state.user} item={this.props.edit_item} userItems={this.userItems} /> 
	    );
	}
    }

    // Collect navBarProps into single object to pass as props
    navBarProps() {
        return ({
            postItem: this.postItem,
            availableItems: this.availableItems,
	    userItems: this.userItems,
            userInfo: this.state.user,
            stateLogin: this.login,
            stateLogout: this.logout
        });
    }
    
    render() {
        return (

            <div className="animated fadeIn">
                
                <NavBar navBarProps={this.navBarProps()}/>

                { this.renderSelection() }

            </div>
        );
    }
}


const mapStateToProps = ({ centralReducer }) => {
    return {
        renderSelector: centralReducer.renderSelector,
	edit_item: centralReducer.edit_item
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ postItemButton, availableItemsButton, userItemsButton, editItemButton }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
