var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//APIs
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

const Books = require('./models/books');

// --->>> POST BOOKS <<<----
app.post('/books', (req, res) => {
    const book = req.body;

    Books.create(book, (err, books) => {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

// --->>> POST BOOKS <<<----
app.get('/books', (req, res) => {
    Books.find((err, books) => {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

// --->>> DELETE BOOKS <<<----
app.delete('/books/:_id', (req, res) => {
    const query = { _id: req.params._id };

    Books.remove(query, (err, books) => {
        if(err) {
            throw err;
        }
        res.json(books);
    });
});

// --->>> POST BOOKS <<<----
app.put('/books/:_id', (req, res) => {
    const book = req.body;
    const query = req.params._id;
    // IF THE FIELD DOESN'T EXIST $set WILL SET A NEW FIELD
    const update = {
        '$set': {
        title: book.title,
        description: book.description,
        image: book.image,
        price: book.price
    }
};
    // WHEN TRUE RETURN THE UPDATE DOCUMENT
    const options = { new: true};

    Books.findOneAndUpdate(query, update, options, (err, books) => {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

// END APIs

app.listen(3001, function(err){
    if(err){
        return console.log(err);
    }
    console.log('API Sever is listening on http://localhost:3001');
});