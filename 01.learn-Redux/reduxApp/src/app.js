"user strict"

import { createStore } from 'redux';

// Step 3 define reduces
const reducer = (state = { books:[] }, action) => {
    switch (action.type) {
        case "POST_BOOK":
        // let books = state.books.concat(action.payload);
        //     return { books };
        return { books: [ ...state.books, ...action.payload ] }
        break;

        case "DELETE_BOOK":
        // Create a copy of the current array of books
        const currentBookToDelete = [...state.books]

        // Determine at which index in books array is the book to be deleted
        const indexToDelete = currentBookToDelete.findIndex(book => book.id === action.payload.id)

        //use slice to remove the book at the specified index
        return { books: [...currentBookToDelete.slice(0, indexToDelete),
            ...currentBookToDelete.slice(indexToDelete + 1)] }
        break;

        case "UPDATE_BOOK":
        // Create a copy of the current array of books
        const currentBookToUpdate =[...state.books]

        // Determine at which index in books array is the book to be deleted
        const indexToUpdate = currentBookToUpdate.findIndex(book => book.id === action.payload.id);

        // Create a new book object with the new values and with the same array index of the item we want to replace.
        // To achieve this we will use ...spread but we could use concat methods too
        const newBookToUpdate = {
            ...currentBookToUpdate[indexToUpdate],
            title: action.payload.title,
            description: action.payload.description
        }

        // This Log has the purpose to show you how newBookToUpdate looks like
        console.log("what is it newBookToUpdate", newBookToUpdate);

        //use slice to remove the book at the specified index, replace with the new object
        // and concatenate witht he rest of items in the array
        return { books: [...currentBookToUpdate.slice(0, indexToUpdate),
            newBookToUpdate,
            ...currentBookToUpdate.slice(indexToUpdate +1)] }
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