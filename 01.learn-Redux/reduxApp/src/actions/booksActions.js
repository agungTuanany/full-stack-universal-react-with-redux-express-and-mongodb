"use strict"

import axios from 'axios';

// GET A BOOKS
export const getBooks = ()  => async dispatch => {
    try {
        const res = await axios.get('/api/books');

        dispatch({ type: "GET_BOOKS", payload: res.data });
    } catch (err) {
        dispatch({ type: "GET_BOOKS_REJECTED", payload: err });
        console.log(err);
    }
}

// POST A BOOK
export const postBooks = (book) => async dispatch => {
    try {
        const res = await axios.post('/api/books', book);

        dispatch({ type: "POST_BOOK", payload: res.data })
    } catch (err) {
        dispatch({ type: "POST_BOOK_REJECTED", payload: "There was an error while posting a new book" })
        console.log(err);
    }
}

// DELETE A BOOK
export const deleteBooks = (id) => async dispatch => {
        try {
            const res = await axios.delete('/api/books/' + id);

            dispatch({ type: "DELETE_BOOK", payload: id });
        } catch (err) {
            dispatch({ tpe: "DELETE_BOOK_REJECTED", payload: err });
            console.log(err)
        }
}

// UPDATE A BOOK
export function updateBooks(book) {
    return {
        type: "UPDATE_BOOK",
        payload: book
    }
}
