//app.js
var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');

var routes = require('./routes/index');
var users = require('./routes/users');

var comic = require('./routes/comic.route'); // Imports routes for the products
var app = express();

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(__dirname + 'source\templates'));
app.use('/comics', comic);

var template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade');
//var template = require('http').rea(__dirname + '/source/templates/homepage.html');

//app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
  try {
    var html = template({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
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
app.use(function(req,res,next){
  req.db = db;
  next();
});

var router = express.Router();

// About page route
router.get('/about', function(req, res) {
  res.send('About this wiki');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/comics', comic);

app.use(bodyParser.urlencoded({extended:true}));  

app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 }); 

 app.get('/', (request, response) => {
  response.render('home', {
    name: 'John'
  })
})

app.post('/signup', function(req,res){
  console.log(req.body);
})

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});