import React from 'react'

export const FakePostForm = (props) => {
    return(
        <div id="form-holder" className="card animated fadeIn">
        <div className="card-content">
            <span className="card-title">Add a new item for rent!</span>
            <div className="row">
                <div className="input-field col s5">
                    <input
                        onChange=""
                        data-type="item_name"
                        placeholder="Item Name"
                        value=""
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
                    <input onChange="" value=""
                    data-type="item_price" placeholder="Price" id="price" type="text" className="validate"/>
                    <label htmlFor="price">Price</label>
                </div>
            </div>
            <div className="rate">
                <div className="row">
                    <label htmlFor="">Rate</label>
                    <p>
                        <input onChange=""
                        data-type="item_rent_hourly" id="hourly" type="radio" name="rate" value="hourly" defaultChecked/>
                        <label htmlFor="hourly">Hourly</label>
                    </p>
                    <p>
                        <input onChange=""
                        data-type="item_rent_daily" id="daily" type="radio" name="rate" value="daily"/>
                        <label htmlFor="daily">Daily</label>
                    </p>
                    <p>
                        <input onChange=""
                        data-type="item_rent_weekly" id="weekly" type="radio" name="rate" value="weekly"/>
                        <label htmlFor="weekly">Weekly</label>
                    </p>
                    <p>
                        <input onChange=""
                        data-type="item_rent_monthly" id="monthly" type="radio" name="rate" value="monthly"/>
                        <label htmlFor="monthly">Monthly</label>
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s5">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea onChange="" value=""
                    data-type="item_description" id="description" className="materialize-textarea"></textarea>
                    <label htmlFor="description">Description</label>
                </div>
            </div>
            <div className="row">
                <div className="file-field input-field col s5">
                    <div className="btn">
                        <span>Upload Image</span>
                        <input type="file" onChange="" data-type="item_image" id="image"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <a onClick=""  className="waves-effect waves-light btn">Post Item</a>
            </div>
        </div>
    </div>
    )
}

export default FakePostForm;