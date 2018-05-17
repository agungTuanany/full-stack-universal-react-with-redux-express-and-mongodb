"use strict"

import { combineReducers } from 'redux';

// HERE IMPORT REDUCER TO BE COMBINED
import { bookReducers } from './booksReducers';
import { cartReducers } from './cartReducers';

// HERE COMBINDE THE REDUCERS
export default combineReducers({
    books: bookReducers,
    cart: cartReducers
})