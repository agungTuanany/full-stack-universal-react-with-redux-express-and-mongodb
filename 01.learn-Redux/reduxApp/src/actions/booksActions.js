"use strict"

import axios from 'axios';

// GET A BOOKS
export function getBooks() {
    return {
        type: "GET_BOOKS",
    }
}

// POST A BOOK
export const postBooks = (book) => async dispatch => {
    try {
        const res = await axios.post('/books', book);

        dispatch({ type: "POST_BOOK", payload: res.data })
    } catch (err) {
        console.log(err);
        dispatch({ type: "POST_BOOK_REJECTED", payload: "There was an error while posting a new book" })
    }
}

// DELETE A BOOK
export function deleteBooks(id) {
    return {
        type: "DELETE_BOOK",
        payload: id
    }
}

// UPDATE A BOOK
export function updateBooks(book) {
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}
