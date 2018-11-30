//app.js
var express = require('express');
var bodyParser = require('body-parser');

var comic = require('./routes/comic.route'); // Imports routes for the products
var app = express();
//app.use('/comics', comic);


// Set up mongoose connection
// Import the mongoose module
var mongoose = require('mongoose');


let dev_db_url = 'mongodb://localhost:27017/ComicBookWebApp';

var mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

// Get the default connection
var db = mongoose.connection;

// Bind connection to the error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/comics', comic);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});