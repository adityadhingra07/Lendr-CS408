const mainInitialState = {
    renderSelector: 'AVAILABLE_ITEMS'
}

function centralReducer (state = mainInitialState, action) {
    switch (action.type) {
        case 'CLICKED_POST_ITEM':
            return ({
                renderSelector: 'POST_NEW_ITEM'
            });
        case 'CLICKED_AVAILABLE_ITEMS':
            return ({
                renderSelector: 'AVAILABLE_ITEMS'
            });
	case 'CLICKED_USER_ITEMS':
	    return ({
	    	renderSelector: 'USER_ITEMS'
	    });
            
        default:
            return state
    }
}

export default centralReducer;
