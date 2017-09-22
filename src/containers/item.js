import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
	const item = this.props.item;
        return(
            <div className="row animated fadeIn">
                <div id="item-holder" className="col m12 offset-m3">
                    <div className="card grey lighten-2 z-depth-0">
                        <div className="card-image">
                            <img/>
                        </div>
                        <div className="card-content black-text">
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

export default connect(mapStateToProps, mapDispatchToProps)(Item)
