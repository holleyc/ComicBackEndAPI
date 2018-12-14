//app.js
var express = require('express');
var bodyParser = require('body-parser');

var comic = require('./routes/comic.route'); // Imports routes for the products
var app = express();

var template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade');
var listtemplate = require('jade').compileFile(__dirname + '/source/templates/comiclistpage.jade');

app.get('/', function (req, res, next) {
  try {
    var html = template({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
});

/* GET Userlist page. */
app.get('/comiclist', function(req, res) {
  // var db = req.db;
  // var collection = db.get('comics');
  // collection.find({},{},function(e,docs){
  //     res.render('comics', {
  //         "comics" : docs
  //     });
  // });
});

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

// Make our db accessible to our router
// app.use(function(req,res,next){
//   req.db = db;
//   next();
// });

app.set('view engine', 'jade');

// Global string
var str = "";

// GET home page. and iterate, display the collection to console log.
// I need to go back and fix this so it works correctly
app.get('/comicss', function (req, res) {
  var MongoClient = require('mongodb').MongoClient;

  var results_from_mongo = [];

  var str = db.collection('comics').find();
  str.each(function (err, doc) {

    //assert.equal(err, null);
    if (doc != null) {
        console.log(doc);
        results_from_mongo.push(doc); //Push result onto results_array
    }
  });  

  //  try {
  //   var html = listtemplate({ title: 'Comic List' })
  //   res.send(html)
  // } catch (e) {
  //   next(e)
  // }

  res.render('index', {"results": results_from_mongo });

});

var router = express.Router();

// About page route
router.get('/about', function(req, res) {
  res.send('About this wiki');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/comics', comic);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});