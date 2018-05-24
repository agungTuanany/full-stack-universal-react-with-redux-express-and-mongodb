// Index.js for Reducer
"use strict";

import { combineReducers } from "redux";

// HERE IMPORT REDUCER TO BE COMBINED
import { bookReducers } from "./booksReducers";
import { cartReducers } from "./cartReducers";

// HERE COMBINE THE REDUCERS
export default combineReducers({
    books: bookReducers,
    cart: cartReducers
});
