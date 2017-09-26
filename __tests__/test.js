// Import redux actions
import availableItemsButton from '../src/actions/available_items';
import postItemButton from '../src/actions/post_item_button'

import centralReducer from '../src/reducers/reducer_central'

describe('redux-actions', () => {

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
        payload: ""
    }

    const mockedActionAvailable = {
        type: 'CLICKED_AVAILABLE_ITEMS',
        payload: ""
    }

    const expectedStatePost = {
        renderSelector: 'POST_NEW_ITEM'
    }
    
    const expectedStateAvailable = {
        renderSelector: 'AVAILABLE_ITEMS'
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
})