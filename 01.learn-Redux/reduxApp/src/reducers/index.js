"use strict"

import { combineReducers } from 'redux';

// HERE IMPORT REDUCER TO BE COMBINED
import { bookReducers } from './booksReducers';

// HERE COMBINDE THE REDUCERS
export default combineReducers({
    books: bookReducers,
})