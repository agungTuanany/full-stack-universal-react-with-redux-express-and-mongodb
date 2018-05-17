"user strict"

import { createStore } from 'redux';

// Step 3 define reduces
const reducer = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + action.payload;
            break;
    }
    return state
}

// Step 1 create the store
const store = createStore(reducer);

store.subscribe(() => {
    console.log(`current state is:`, store.getState());
});

// step 2 create and dispatch action
store.dispatch({ type: "INCREMENT", payload: 1 })
store.dispatch({ type: "INCREMENT", payload: 1 })
store.dispatch({ type: "INCREMENT", payload: 1 })