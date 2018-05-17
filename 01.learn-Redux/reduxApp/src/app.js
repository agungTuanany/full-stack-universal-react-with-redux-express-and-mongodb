"user strict"

import { createStore } from 'redux';

// Step 3 define reduces
const reducer = (state = {}, action) => {
    switch (action.type) {
        case "POST_BOOK":
            return state = action.payload;
            break;
    }
    return state
}

// Step 1 create the store
const store = createStore(reducer);

store.subscribe(() => {
    console.log(`current state is:`, store.getState());
    console.log(`current price:`, store.getState().price);
});

// step 2 create and dispatch action
store.dispatch({
    type: "POST_BOOK",
    payload: {
        id: 1,
        title: 'this is book title',
        description: 'this is the book description',
        price: 55.33
    }
})
