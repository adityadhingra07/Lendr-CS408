import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase';

class EditItem extends Component {
    constructor(props) {
        debugger;
        super(props);

				let item = this.props.item;
        this.state = {
            user_name: this.props.userName.email,
            item_name : item.item_name,
            item_price : item.item_price,
            item_rate : item.item_rate,
            item_description : item.item_description,
            item_image : item.item_image,
            image_change : false
        };
    }

    getImgURL(item_image) {
        let ref = this;
        let storage = firebase.app().storage().ref().child('images/' + item_image);
        storage.getDownloadURL().then(function (url) {
            ref.setState({ image_url: url });
        }).catch(function (error) {
            console.log(error);
        });
    }

    onInputChange = (event) => {
        const data_type = event.target.getAttribute('data-type');

        const targetValue = event.target.value;

        switch (data_type) {
            case 'item_name':
                this.setState({ item_name: targetValue });
                break;
            case 'item_price':
                this.setState({ item_price: targetValue });
                break;
            case 'item_rent_hourly':
                this.setState({ item_rate: targetValue });
                break;
            case 'item_rent_daily':
                this.setState({ item_rate: targetValue });
                break;
            case 'item_rent_weekly':
                this.setState({ item_rate: targetValue });
                break;
            case 'item_rent_monthly':
                this.setState({ item_rate: targetValue });
                break;
            case 'item_description':
                this.setState({ item_description: targetValue });
                break;
            case 'item_image':
                let image_name = this.state.item_image;
                this.setState({ item_image: image_name, image_change: true });
                break;

            default:
                break;
        }
    };

   onFormSubmit() {

       if(this.state.image_change) {
           let item_image = document.getElementById('image').files[0];
           let storage = firebase.app().storage().ref().child('images/' + this.state.item_image);
           storage.put(item_image).then(function(snapshot) {
               console.log('Image Uploaded');
           });
       }

        console.log(this.state);
	    let ref = this;
        let itemsRef = firebase.app().database().ref().child('items').child(this.props.item.item_id).update({
            item_description: ref.state.item_description,
            item_name: ref.state.item_name,
            item_price: ref.state.item_price,
            item_rate: ref.state.item_rate
	    });
	    this.props.userItems();
    }

    render() {
        return (
            <div id="form-holder" className="card animated fadeIn">
                <div className="card-content">
                    <span className="card-title">Edit your item:</span>
                    <div className="row">
                        <div className="input-field col s5">
                            <input
                                onChange={this.onInputChange.bind(this)}
                                data-type="item_name"
                                placeholder="Item Name"
                                value={this.state.item_name}
                                id="item-name"
                                type="text"
                                className="active validate"
                                required/>
                            <label htmlFor="item-name">Item Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s5">
                            <i className="material-icons prefix">attach_money</i>
                            <input onChange={this.onInputChange.bind(this)} value={this.state.item_price}
                            data-type="item_price" placeholder="Price" id="price" type="text" className="validate"/>
                            <label htmlFor="price">Price</label>
                        </div>
                    </div>
                    <div className="rate">
                        <div className="row">
                            <label htmlFor="">Rate</label>
                            <p>
                                <input onChange={this.onInputChange.bind(this)}
                                data-type="item_rent_hourly" id="hourly" type="radio" name="rate" value="hourly" defaultChecked/>
                                <label htmlFor="hourly">Hourly</label>
                            </p>
                            <p>
                                <input onChange={this.onInputChange.bind(this)}
                                data-type="item_rent_daily" id="daily" type="radio" name="rate" value="daily"/>
                                <label htmlFor="daily">Daily</label>
                            </p>
                            <p>
                                <input onChange={this.onInputChange.bind(this)}
                                data-type="item_rent_weekly" id="weekly" type="radio" name="rate" value="weekly"/>
                                <label htmlFor="weekly">Weekly</label>
                            </p>
                            <p>
                                <input onChange={this.onInputChange.bind(this)}
                                data-type="item_rent_monthly" id="monthly" type="radio" name="rate" value="monthly"/>
                                <label htmlFor="monthly">Monthly</label>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s5">
                            <i className="material-icons prefix">mode_edit</i>
                            <textarea onChange={this.onInputChange.bind(this)} value={this.state.item_description}
                            data-type="item_description" id="description" className="materialize-textarea"></textarea>
                            <label htmlFor="description">Description</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="file-field input-field col s5">
                            <div className="btn">
                                <span>Upload Image</span>
                                <input type="file" onChange={this.onInputChange.bind(this)} data-type="item_image" id="image"/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <a onClick={this.onFormSubmit.bind(this)}  className="waves-effect waves-light btn">Update Item</a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {prop: ""}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export const onFormSubmit = EditItem.prototype.onFormSubmit;
export default connect(mapStateToProps, mapDispatchToProps)(EditItem)
