var mongoose = require('mongoose');
mongoose.Promise = require('promise');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var route_static = require('./routes/static.js');
var route_things = require('./routes/things.js');
var route_dynamic = require('./routes/dynamic.js');
var route_views = require('./routes/views.js');
var route_forms = require('./routes/forms.js');
var route_person = require('./routes/person.js');

mongoose.connect('mongodb://localhost/person_db');
var upload = multer();
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(upload.array());
app.use(express.static('public'));


//both index.js and things.js should be in the same directory

var request_time_logger = require('./middleware/request-time-logger.js');

app.use('/', function(req, res, next) {
	console.log('Start');
	next();
});
app.get('/', function(req, res) {
	res.send('It works!');
});

app.use('/static', route_static);
app.use('/things', route_things);
app.use('/dynamic', route_dynamic);
app.use('/views', route_views);
app.use('/forms', route_forms);
app.use('/person', route_person);

app.use(request_time_logger);

app.get('*', function(req, res) {
	res.send('404 page. Sorry, this is an invalid url.');
});

app.use('/', function(req, res, next) {
	console.log('End');
});

app.listen(3000);