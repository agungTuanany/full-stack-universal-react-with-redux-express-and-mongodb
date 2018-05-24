var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//APIs
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bookshop");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "#MongoDB - Connection ERROR: "));

// --->>> SET UP SESSIONS <<<----
app.use(
    session({
        secret: "mySecretString",
        saveUninitialized: false,
        resave: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 }, // 2 days in milliseconds
        store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
        //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
    })
);
// SAVE SESSION CART API
app.post("/cart", (req, res) => {
    const cart = req.body;
    req.session.cart = cart;
    req.session.save(err => {
        if (err) {
            throw err;
        }
        res.json(req.session.cart);
    });
});

// GET SESSION CART API
app.get("/cart", (req, res) => {
    if (typeof req.session.cart !== "undefined") {
        res.json(req.session.cart);
    }
});
// --->>> END SESSIONS UP <<<----

const Books = require("./models/books");

// --->>> POST BOOKS <<<----
app.post("/books", (req, res) => {
    const book = req.body;

    Books.create(book, (err, books) => {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

// --->>> POST BOOKS <<<----
app.get("/books", (req, res) => {
    Books.find((err, books) => {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

// --->>> DELETE BOOKS <<<----
app.delete("/books/:_id", (req, res) => {
    const query = { _id: req.params._id };

    Books.remove(query, (err, books) => {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

// --->>> POST BOOKS <<<----
app.put("/books/:_id", (req, res) => {
    const book = req.body;
    const query = req.params._id;
    // IF THE FIELD DOESN'T EXIST $set WILL SET A NEW FIELD
    const update = {
        $set: {
            title: book.title,
            description: book.description,
            image: book.image,
            price: book.price
        }
    };
    // WHEN TRUE RETURN THE UPDATE DOCUMENT
    const options = { new: true };

    Books.findOneAndUpdate(query, update, options, (err, books) => {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

// --->>> GET BOOKS IMAGES API <<<----
app.get("/images", (req, res) => {
    const imgFolder = __dirname + "/public/images/";
    // REQUIRE FILE SYSTEM
    const fs = require("fs");
    // READ ALL FILES IN THE DIRECTORY
    fs.readdir(imgFolder, (err, files) => {
        if (err) {
            return console.log(err);
        }
        // CREATE AN EMPTY ARRAY
        const filesArr = [];
        // var i = 1;
        // ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE ARRAY
        files.forEach(file => {
            filesArr.push({ name: file });
            // i++
        });
        // SEND THE JSON RESPONSE WITH THE ARRAY
        res.json(filesArr);
    });
});

// END APIs

app.listen(3001, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("API Sever is listening on http://localhost:3001");
});
