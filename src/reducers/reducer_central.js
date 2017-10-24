const mainInitialState = {
    renderSelector: 'AVAILABLE_ITEMS',
    edit_item: {}
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
	case 'CLICKED_EDIT_ITEM':
	    console.log("In central reducer");
	    console.log("payload item", action.payload);
	    return ({
	    	renderSelector: 'EDIT_ITEM',
		edit_item: action.payload
	    });
            
        default:
            return state
    }
}

export default centralReducer;
