import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';
import Item from './item';

class Items extends Component {
		constructor(props) {
				super(props);

				this.state = { item_list: [] };
				this.fetchItems = this.fetchItems.bind(this);
				this.rentItem = this.rentItem.bind(this);
		}

		componentDidMount() {
				this.fetchItems(); }

		fetchItems() {
				let items = [];
				let itemsRef = firebase.database().ref().child('items');
				const ref = this;
				itemsRef.on('value', function(snapshot) {
						snapshot.forEach(function(childSnapshot) {
								items.push(childSnapshot.val());
								//console.log(childSnapshot.val());
								let item = childSnapshot.val();
								item['item_id'] = childSnapshot.key;
								ref.setState((prevState) => { items: prevState.item_list.push(item) });
						});
				});
		}

		rentItem(itemInfo) {
				if (itemInfo.item_status == 'available') {
					// Change the status of the item here
					// Proceed by updating the local state first and then push
					// the changes to Firebase
					let item_l = this.state.item_list;
					this.setState({ item_list: [] });

					let itemsRef = firebase.app().database().ref().child('items').child(itemInfo.item_id).update({
						item_status: "not_available",
						item_rented_by: this.props.userName.email
					});

					this.fetchItems();

				} else {

					//Waitlist

					this.setState({ item_list: [] });
					
					let itemsRef = firebase.app().database().ref().child('items').child(itemInfo.item_id).child("waitlist").push(this.props.userName.email);	
					
					this.fetchItems();					
				}
		}

		render() {
				//console.log(this.props.userName, "USERNAME IN ITEMS");
				if (this.state.item_list.length == 0) {
						return null
				} else {
						//console.log('It comes here', this.state.item_list);
						return (
										<div>
										{ this.state.item_list.map(item => <Item userName={this.props.userName} key={item.item_id} item={item} rentItem={this.rentItem} />) }
										</div>
							   );
				}
		}
}



const mapStateToProps = (state) => {
		return {
				prop: state.prop
		}
}

const mapDispatchToProps = (dispatch) => {
		return bindActionCreators({  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
