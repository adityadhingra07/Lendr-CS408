
export default function postItemButton(item) {
    return ({
        type: 'CLICKED_EDIT_ITEM',
        payload: item
    });
}
