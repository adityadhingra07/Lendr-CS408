import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';
import UserItem from './user_item';

class UserItems extends Component {
	constructor(props) {
		super(props);

		this.state = { item_list: [] };
		this.fetchItems = this.fetchItems.bind(this);
		this.editItem = this.editItem.bind(this);
	}

	componentDidMount() {
		this.fetchItems();
	}

	fetchItems() {
		let itemsRef = firebase.database().ref()
			.child('items')
			.orderByChild('user_name')
			.equalTo(this.props.userName.email);

		const ref = this;

		itemsRef.on('value', function (snapshot) {
			snapshot.forEach(function (childSnapshot) {
				console.log("Here comes the id");
				console.log(childSnapshot.key);
				let item = childSnapshot.val();
				item["item_id"] = childSnapshot.key;
				ref.setState((prevState) => { item_list: prevState.item_list.push(item) });
			});
		});
	}

	editItem(item_id) {
		console.log("Parent editItem", item_id);

		let item = null;
		let ref = this;

		firebase.database().ref()
				   .child('items')
				   .child(item_id).on('value', function(snapshot) {
				   	item = snapshot.val();
				   });

		console.log("very yolo item", item);
		item["item_id"] = item_id;

		this.props.edit(item);

		//this.setState({ item_list: [] });
		this.fetchItems();
	}

	render() {
		const localState = this;
		if (this.state.item_list.length == 0) {
			return null
		} else {
			return (
					<div>
					{this.state.item_list.map(item => <UserItem key={item.item_id} item={item} editItem={localState.editItem} edit={this.props.edit} />)}
					</div>
			       );
		}
	}
}

const mapStateToProps = ({ centralReducer }) => {
	return {
		item_edit: centralReducer.edit_item
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItems)
