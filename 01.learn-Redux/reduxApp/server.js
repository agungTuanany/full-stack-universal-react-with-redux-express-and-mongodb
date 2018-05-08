"use strict"

const express = require('express');
const path = require('path');

const app = express();

const port = 3000;

// setting middleware to define folder for static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
console.log(`Started up at port ${port}`);
});
