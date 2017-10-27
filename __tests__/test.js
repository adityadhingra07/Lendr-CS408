// Import redux actions
import availableItemsButton from '../src/actions/available_items';
import postItemButton from '../src/actions/post_item_button';
import userItemsButton from '../src/actions/user_items';
import editItemButton from '../src/actions/edit_item_button';

import centralReducer from '../src/reducers/reducer_central';

describe('redux-actions', () => {

    it ('Clicking \'My Items\' should generate correct redux action', () => {
    	const expectedAction = {
		type: 'CLICKED_USER_ITEMS',
		payload: ''
	}

	expect(userItemsButton()).toEqual(expectedAction);
    });

    it ('Clicking the edit-cog in \'My Items\' should generate correct redux action', () => {
	// It will return undefined as in automated testing, there is no way to check
	// which item's edit cog was clicked so it has to pass an item which would
	// be undefined instead of nothing, so we check  for undefined
    	const expectedAction = {
		type: 'CLICKED_EDIT_ITEM',
		payload: undefined
	}

	expect(editItemButton()).toEqual(expectedAction);
    });

    it('Clicking \'Available Items\' should generate correct redux action' , () => {
        
        const expectedAction = {
            type: 'CLICKED_AVAILABLE_ITEMS',
            payload: ""
        }
        
        expect(availableItemsButton()).toEqual(expectedAction);
    });

    it('Clicking \'Post Items\' should generate correct redux action' , () => {
        
        const expectedAction = {
            type: 'CLICKED_POST_ITEM',
            payload: ""
        }
        
        expect(postItemButton()).toEqual(expectedAction);
    });

    it('Clicking \'Available Items\' should generate non-null response' , () => {
        expect(availableItemsButton()).not.toEqual(null);
    });

    it('Clicking \'Post Items\' should generate non-null response' , () => {
        expect(postItemButton()).not.toEqual(null);
    });

    it('Clicking \'My Items\' should generate non-null response', () => {
    	expect(userItemsButton()).not.toEqual(null);
    });

    it('Clicking the edit-cog in \'My Items\' should generate non-null response', () => {
    	expect(editItemButton()).not.toEqual(null);
    });
})


describe('redux-reducers', () => {
    const mainInitialState = {
        renderSelector: 'AVAILABLE_ITEMS'
    }

    const mockedActionNone = {
        type: 'none',
        payload: 'none'
    }
    
    const mockedActionPost = {
        type: 'CLICKED_POST_ITEM',
        payload: ''
    }

    const mockedActionAvailable = {
        type: 'CLICKED_AVAILABLE_ITEMS',
        payload: ''
    }

    const mockedActionMyItems = {
    	type: 'CLICKED_USER_ITEMS',
	payload: ''
    }

    const mockedActionEditItem = {
    	type: 'CLICKED_EDIT_ITEM',
	payload: undefined
    }

    const expectedStatePost = {
        renderSelector: 'POST_NEW_ITEM'
    }
    
    const expectedStateAvailable = {
        renderSelector: 'AVAILABLE_ITEMS'
    }

    const expectedStateMyItems = {
    	renderSelector: 'USER_ITEMS'
    }

    const expectedStateEditItem = {
    	renderSelector: 'EDIT_ITEM',
	edit_item: undefined
    }

    it('Passing invalid action, should generate non-null state response' , () => {
        expect(centralReducer(mainInitialState, mockedActionNone)).not.toEqual(null);
    });

    it('Passing valid action: PostItems, should generate non-null state response' , () => {
        expect(centralReducer(mainInitialState, mockedActionPost)).not.toEqual(null);
    });

    it('Passing valid action: AvailableItems, should generate non-null state response' , () => {
        expect(centralReducer(mainInitialState, mockedActionAvailable)).not.toEqual(null);
    });

    it('Passing valid action: AvailableItems, should generate expected redux state' , () => {
        expect(centralReducer(mainInitialState, mockedActionAvailable)).toEqual(expectedStateAvailable);
    });

    it('Passing valid action: AvailableItems, should generate non-null state response' , () => {
        expect(centralReducer(mainInitialState, mockedActionPost)).toEqual(expectedStatePost);
    });

    it('Passing valid action: UserItems, should generate expected redux state' , () => {
        expect(centralReducer(mainInitialState, mockedActionMyItems)).toEqual(expectedStateMyItems);
    });

    it('Passing valid action: UserItems, should generate non-null state response' , () => {
        expect(centralReducer(mainInitialState, mockedActionMyItems)).toEqual(expectedStateMyItems);
    });

    it('Passing valid action: EditItems, should generate expected redux state' , () => {
        expect(centralReducer(mainInitialState, mockedActionEditItem)).toEqual(expectedStateEditItem);
    });

    it('Passing valid action: EditItems, should generate non-null state response' , () => {
        expect(centralReducer(mainInitialState, mockedActionEditItem)).toEqual(expectedStateEditItem);
    });
})
