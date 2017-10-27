
export default function editItemButton(item) {
    return ({
        type: 'CLICKED_EDIT_ITEM',
        payload: item
    });
}
