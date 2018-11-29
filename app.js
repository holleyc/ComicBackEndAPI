//app.js
const express = require('express');
const bodyParser = require('body-parser');

const comic = require('./routes/comic.route'); // Imports routes for the products
const app = express();
app.use('/comics', comic);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});