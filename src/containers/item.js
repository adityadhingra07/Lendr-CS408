import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = { image_url: "" }
        this.getImgURL = this.getImgURL.bind(this);
        this.rentItem = this.rentItem.bind(this);
        this.buttonRender = this.buttonRender.bind(this);
			  this.returnItem = this.returnItem.bind(this);        
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

		rentItem() {
				console.log("Renting Item");
				let itemInfo = { item_id: this.props.item.item_id,
					     item_status: this.props.item.item_status }
		    this.props.rentItem(itemInfo);
    }

    //TODO:
    returnItem() {

    }
    
    buttonRender() {
        const userName = this.props.userName.email
        const item = this.props.item;
        const buttonName = "Rent"
        if(item.item_status == 'available') {
            return (
                <button className="waves-effect waves-light btn z-depth-0" onClick={this.rentItem}> Rent </button>                
            );
        }
        else {
            if(item.item_rented_by == userName) {
                return (
                    <button className="waves-effect waves-light btn z-depth-0" onClick={this.returnItem}> Return Item </button>                
                );
            }
            else {
                return (
                    <button className="waves-effect waves-light btn z-depth-0" onClick={this.rentItem}> Waitlist </button>                
                );
            }
        }
    }

    render() {
				const item = this.props.item;
				this.getImgURL();
		
        return(
            <div className="row animated fadeIn">
                <div id="item-holder" className="col m12 offset-m3">
                    <div className="card grey lighten-2">
                        <div className="card-image">
                            <img className="responsive-img" id="item_image" src={this.state.image_url}/>
                        </div>
			            <span id="item_status_available" className="chip" style={{float: 'right'}}> Available  </span>
                        <div className="card-content black-text">
                            <span className="card-title">{item.item_name}</span>
                            <blockquote>Price: ${item.item_price} {item.item_rate} </blockquote>
                            <p> {item.item_description} </p>
                        </div>
                        <div className="card-action">
                            {this.buttonRender()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Item)
