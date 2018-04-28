var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

// var logger = function(req,res,next){
// 	console.log('logging...');
// 	next();
// }
//
// app.use(logger);

//  View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//  Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//  Set static path
app.use(express.static(path.join(__dirname,'public')));

var users = [
	{
		id:1,
		firstName: 'John',
		lastName: 'Doe',
		email: 'anEmail@email.com'
	},
	{
		id:2,
		firstName: 'Jane',
		lastName: 'Doe',
		email: 'anEmail@email.co.tk'
	},
	{
		id:3,
		firstName: 'Barb',
		lastName: 'Run',
		email: 'anEmail@email.co.pl'
	}
]

app.get('/', function(req,res){
	res.render('index', {
		title: 'Customers',
		users: users
	});
});

app.post('/users/add', function(req,res){
	var newUser = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
	}
	console.log(newUser);
});

app.listen(3000, function(){
	console.log('Server started on port 3000...');
});
