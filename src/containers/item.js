import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class Item extends Component {
    constructor(props) {
        super(props);

        this.rentItem = this.rentItem.bind(this);
        this.buttonRender = this.buttonRender.bind(this);
		this.returnItem = this.returnItem.bind(this);        
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
		console.log('Inside here: ', item);

        return(
            <div className="row animated fadeIn">
                <div id="item-holder" className="col m12 offset-m3">
                    <div className="card grey lighten-2 z-depth-0">
                        <div className="card-image">
                            <img src={item.item_image}/>
                        </div>
			{/*<span style={{float: 'right'}}> {item.item_status}  </span>*/}
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
