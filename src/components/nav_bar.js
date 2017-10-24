import React from 'react'

const NavBar = (props) => {

    return(
        <div id="nav-holder" className="animated fadeInDown">
            <nav> 
                <div className="nav-wrapper">
                    <a id="app-logo" href="#" className="brand-logo">Lendr</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <a id="nav-links" onClick={props.navBarProps.postItem}> Post Items </a>
                        </li>
                        <li>
                            <a id="nav-links" onClick={props.navBarProps.availableItems}> Available Items </a>
                        </li>
					    <li>
							<a id="nav-links" onClick={props.navBarProps.userItems}> My Items </a>
					    </li>
                        <li>
                            {props.navBarProps.userInfo
                                ?
                                <a id="auth-button" onClick={props.navBarProps.stateLogout}>
                                    Log out of
                                    <div className="chip">
                                        <img src={props.navBarProps.userInfo.photoURL} alt="Contact Person" />
                                        {props.navBarProps.userInfo.displayName}
                                    </div>
                                </a>
                                : <a id="auth-button-sign-in" onClick={props.navBarProps.stateLogin}><img id="auth-img" src="../../assets/web/2x/btn_google_signin_dark_normal_web@2x.png"/></a>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;
