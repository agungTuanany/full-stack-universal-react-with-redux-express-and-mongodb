"user strict"

// CART REDUCERS
export function cartReducers(state={ cart: []}, action) {
    switch(action.type) {
        case "ADD_TO_CART":
        return { ...state, cart: action.payload }
        break;
        case "DELET_CART_ITEM":
        return { ...state, cart: action.payload }
        break;
    }
    return state
}