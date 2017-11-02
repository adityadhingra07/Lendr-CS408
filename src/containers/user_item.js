import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';

class UserItem extends Component {
    constructor(props) {
      super(props);
      this.state = { image_url: "" }
		  this.editItem = this.editItem.bind(this);
	    this.getImgURL = this.getImgURL.bind(this);
	    console.log(this.props.item, "item");
    }

    editItem() {
			console.log("Child editItem");
    	this.props.editItem(this.props.item.item_id);
    }

    getImgURL() {
        let ref = this;
        let storage = firebase.app().storage().ref().child('images/' + this.props.item.item_image);
        storage.getDownloadURL().then(function (url) {
            ref.setState({ image_url: url });
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
	const item = this.props.item;
	const edit = this.editItem;
	this.getImgURL();
        return(
            <div className="row animated fadeIn">
                <div id="item-holder" className="col m12 offset-m3">
                    <div className="card grey lighten-2">
                        <div className="card-image">
                            <img className="responsive-img" id="item_image" src={this.state.image_url}/>
                        </div>
                        <div className="card-content black-text">
			    <span style={{float:'right'}}> <i className="fa fa-cog" style={{cursor:"pointer"}} onClick={edit}></i> </span>
                            <span className="card-title">{item.item_name}</span>
                            <blockquote>Price: ${item.item_price} {item.item_rate} </blockquote>
                            <p> {item.item_description} </p>
                        </div>
                        <div className="card-action">
                            <button className="waves-effect waves-light btn z-depth-0">Rent</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        prop: ""
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItem)
