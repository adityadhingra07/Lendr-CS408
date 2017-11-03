import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';

class NoUserItem extends Component {
    constructor(props) {
        super(props);
        this.state = { image_url: "" }
        this.getImgURL = this.getImgURL.bind(this);
    }

    getImgURL() {
        let ref = this;
				let storage = firebase.app().storage().ref().child('images/' + this.props.item.item_image);
				storage.getDownloadURL().then(function (url) {
						ref.setState({ image_url: url });
				}).catch(function (error) {
				});
    }

    render() {
				const item = this.props.item;
				this.getImgURL();
				let status = "Available";
				let statusID = "item_status_available";
				if (item.item_status === "available") {
        		status = "Available";
            statusID = "item_status_available";
        } else {
				    status = "Not Available";
            statusID = "item_status_unavailable";
        }

        return(
            <div className="row animated fadeIn">
                <div id="item-holder" className="col m12 offset-m3">
                    <div className="card grey lighten-2">
                        <div className="card-image">
                            <img className="responsive-img" id="item_image" src={this.state.image_url}/>
                        </div>
			            <span id={statusID} className="chip" style={{float: 'right'}}> {status}  </span>
                        <div className="card-content black-text">
                            <span className="card-title">{item.item_name}</span>
                            <blockquote>Price: ${item.item_price} {item.item_rate} </blockquote>
                            <p> {item.item_description} </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(NoUserItem)
