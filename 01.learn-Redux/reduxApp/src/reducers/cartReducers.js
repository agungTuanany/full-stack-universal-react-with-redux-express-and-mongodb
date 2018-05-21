"user strict"

// CART REDUCERS
export function cartReducers(state={ cart: []}, action) {
    switch(action.type) {
        case "ADD_TO_CART":
        return {
            ...state,
            cart: action.payload,
            totalAmount: totals(action.payload).amount,
            totalQty: totals(action.payload).qty
        }
        break;

        case "UPDATE_CART":
        const currentBookToUpdate =[...state.cart]
        const indexToUpdate = currentBookToUpdate.findIndex((book) => book._id === action._id);
        const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
            }

        let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate),
            newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate +1)];

        return {
            ...state,
            cart: cartUpdate,
            totalAmount: totals(cartUpdate).amount,
            totalQty: totals(cartUpdate).qty
        }
        break;

        case "DELET_CART_ITEM":
        return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
        }
        break;
    }
    return state
}

// CALCULATE TOTALS
export function totals(payloadArr) {
    const totalAmount = payloadArr.map((cartArr) => cartArr.price * cartArr.quantity
        ).reduce((a, b) => a + b, 0); // start summing from index 0

    const totalQty = payloadArr.map((qty) => qty.quantity).reduce((a, b) => a + b, 0);

    return {
        amount: totalAmount.toFixed(2),
        qty: totalQty
    }
}