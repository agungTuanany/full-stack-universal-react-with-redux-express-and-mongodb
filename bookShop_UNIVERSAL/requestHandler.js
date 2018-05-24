"use strict";
import axios from "axios";

const handlerRender = async (req, res) => {
    try {
        const response = await axios.get("http://localhost:3001/books");
        const myHtml = JSON.stringify(response.data);

        res.render("index", { myHtml });
    } catch (err) {
        console.log("#initial server-side rendering error", err);
    }
};

module.exports = handlerRender;
