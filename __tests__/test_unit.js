import availableItemsButton from '../src/actions/available_items';
import postItemButton from '../src/actions/post_item_button'

describe('actions', () => {

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

})