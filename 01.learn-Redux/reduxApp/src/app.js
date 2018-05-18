"user strict"

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';

// IMPORT ACTIONS
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks } from './actions/booksActions';

// Step 1 create the store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

// store.subscribe(() => {
//     console.log(`current state is:`, store.getState());
//     // console.log(`current price:`, store.getState()[1].price);
// });

// step 2 create and dispatch action
store.dispatch(postBooks(
    [{
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
))

// DELETE a book
store.dispatch(deleteBooks(
    { id: 1 }
))

// UPDATE a book
store.dispatch(updateBooks(
    {
        id: 2,
        title: 'THE 24h Redux course',
        description: 'id two change the description'
    }
))

// -->> CART ACTIONS <<--
// ADD to cart

store.dispatch(addToCart([{ id: 1 }]))