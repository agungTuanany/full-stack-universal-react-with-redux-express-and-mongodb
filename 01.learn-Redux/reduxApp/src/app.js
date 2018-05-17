"user strict"

import { createStore } from 'redux';

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index'

// Step 1 create the store
const store = createStore(reducers);

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
// Do not forget to update yur second dispactch to be an array @param payload"[{}]
store.dispatch({
    type: "POST_BOOK",
    payload: [{
        id: 3,
        title: 'this is the thrid book title',
        description: 'this is the third book description',
        price: 33
    }]
})

// DELETE a book
store.dispatch({
    type: "DELETE_BOOK",
    payload: { id: 1 }
})

// UPDATE a book
store.dispatch({
    type: "UPDATE_BOOK",
    payload: {
        id: 2,
        title: 'THE 24h Redux course',
        description: 'id two change the description'
    }
})