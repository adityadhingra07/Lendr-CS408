import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase';
import uuid from 'uuid';

class PostForm extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.userName.email);

        this.state = {
            user_name: this.props.userName.email,
            item_name :  "",
            item_price : "",
            item_rate : "hourly",
            item_description : "",
            item_image : null,
            item_status: "available",
            item_rented_by: "",
            waitlist: ""
        };
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
                let image_name = uuid.v1();
                this.setState({ item_image: image_name });
                break;

            default:
                break;
        }
    };

   onFormSubmit() {
        let item_image = document.getElementById('image').files[0];
        let storage = firebase.app().storage().ref().child('images/' + this.state.item_image);
            storage.put(item_image).then(function(snapshot) {
                console.log('Image Uploaded');
            });

        console.log(this.state);
        let itemsRef = firebase.app().database().ref().child('items');
        console.log("itemsRef: ", itemsRef);
        let item = itemsRef.push(this.state);
        console.log("item: ", item.key);

			  this.props.availableItems();
    }

    render() {
        return (
            <div id="form-holder">
                    <span id="postItemHeading"><b>ADD A NEW ITEM FOR RENT.</b></span>
                    <div className="row">
                        <div className="input-field col s5">
                            <i className="material-icons prefix">loyalty</i>
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
                            <div id="col s5">
                                <span htmlFor="rate">Rate:&nbsp;&nbsp;&nbsp;</span>
                                <input onChange={this.onInputChange.bind(this)}
                                data-type="item_rent_hourly" id="hourly" type="radio" name="rate" value="hourly" defaultChecked/>
                                <label htmlFor="hourly">Hourly</label>
                                &nbsp;&nbsp;
                                <input onChange={this.onInputChange.bind(this)}
                                data-type="item_rent_daily" id="daily" type="radio" name="rate" value="daily"/>
                                <label htmlFor="daily">Daily</label>
                                &nbsp;&nbsp;
                                <input onChange={this.onInputChange.bind(this)}
                                data-type="item_rent_weekly" id="weekly" type="radio" name="rate" value="weekly"/>
                                <label htmlFor="weekly">Weekly</label>
                                &nbsp;&nbsp;
                                <input onChange={this.onInputChange.bind(this)}
                                data-type="item_rent_monthly" id="monthly" type="radio" name="rate" value="monthly"/>
                                <label htmlFor="monthly">Monthly</label>
                            </div>
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
                            <div className="waves-effect waves-light btn">
                                <span>Upload Image</span>
                                <input type="file" onChange={this.onInputChange.bind(this)} data-type="item_image" id="image"/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s5">
                            <a onClick={this.onFormSubmit.bind(this)}  className="waves-effect waves-light btn">Post Item</a>
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

export const onFormSubmit = PostForm.prototype.onFormSubmit;
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
