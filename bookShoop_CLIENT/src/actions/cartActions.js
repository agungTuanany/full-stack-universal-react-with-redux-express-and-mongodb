"use strict";

import axios from "axios";

// GET CART
export const getCart = () => async dispatch => {
    try {
        const res = await axios.get("/api/cart");

        dispatch({ type: "GET_CART", payload: res.data });
    } catch (err) {
        dispatch({
            type: "GET_CART_REJECTED",
            message: "ERROR when getting the cart from session"
        });
    }
};

// ADD TO CART
export const addToCart = cart => async dispatch => {
    try {
        const res = await axios.post("/api/cart", cart);

        dispatch({ type: "ADD_TO_CART", payload: res.data });
    } catch (err) {
        dispatch({
            type: "ADD_TO_CART_REJECTED",
            message: "ERROR when adding to the cart"
        });
        console.log(err);
    }
};

// UPDATE CART
export const updateCart = (_id, unit, cart) => async dispatch => {
    const currentBookToUpdate = cart;
    const indexToUpdate = currentBookToUpdate.findIndex(
        book => book._id === _id
    );
    const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + unit
    };

    let cartUpdate = [
        ...currentBookToUpdate.slice(0, indexToUpdate),
        newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate + 1)
    ];

    try {
        const res = await axios.post("/api/cart", cartUpdate);

        dispatch({ type: "UPDATE_CART", payload: res.data });
    } catch (err) {
        dispatch({
            type: "UPDATE_CART_REJECTED",
            message: "ERROR when adding to the cart"
        });
        console.log(err);
    }
};

// DELETE FROM CART
export const deleteCartItem = cart => async dispatch => {
    try {
        const res = await axios.post("/api/cart", cart);

        dispatch({ type: "DELETE_CART_ITEM", payload: res.data });
    } catch (err) {
        dispatch({
            type: "DELETE_CART_ITEM_REJECTED",
            message: "ERROR when deleting an item from the cart"
        });
    }
};
