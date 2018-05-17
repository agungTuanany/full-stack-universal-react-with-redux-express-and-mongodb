"user strict"

import { createStore } from 'redux';

// Step 3 define reduces
const reducer = (state = [], action) => {
    switch (action.type) {
        case "POST_BOOK":
        let books = state.concat(action.payload);
            return books;
            break;
    }
    return state
}

// Step 1 create the store
const store = createStore(reducer);

store.subscribe(() => {
    console.log(`current state is:`, store.getState());
    // console.log(`current price:`, store.getState()[1].price);
});

// step 2 create and dispatch action
store.dispatch({
    type: "POST_BOOK",
    payload: [{
        id: 1,
        title: 'this is book title',
        description: 'this is the book description',
        price: 55.33
    }, {
        id: 2,
        title: 'this is the second book title',
        description: 'this is the second book description',
        price: 66
    }]
})

// DISPATCH a second time
store.dispatch({
    type: "POST_BOOK",
    payload: {
        id: 3,
        title: 'this is the thrid book title',
        description: 'this is the third book description',
        price: 33
    }
})