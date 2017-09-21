import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="row">
                <div id="item-holder" className="col m12 offset-m3">
                    <div className="card grey lighten-2 z-depth-0">
                        <div class="card-image">
                            <img/>
                        </div>
                        <div className="card-content black-text">
                            <span className="card-title">Vacuum Cleaner</span>
                            <blockquote>Price: 5$/hr</blockquote>
                            <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively. I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.
                            </p>
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