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
	}

	componentDidMount() {
		this.fetchItems();
	}

	fetchItems() {
		let items = [];
		let itemsRef = firebase.database().ref().child('items');
		const ref = this;
		itemsRef.on('value', function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				items.push(childSnapshot.val());
				console.log(childSnapshot.val());
				ref.setState((prevState) => { items: prevState.item_list.push(childSnapshot.val())  });
			});
		});
	}

	render() {
		if (this.state.item_list.length == 0) {
			return null
		} else {
			return (
					<div>
					{ this.state.item_list.map(item => <Item key={item.item_name} item = {item} />) }
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
