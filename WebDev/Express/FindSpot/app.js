// Include MongoDB and connect it to FindSpot's database
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/findspot_db";

//  Include Express and set it to app
const express = require('express');
const ejs = require('ejs');

//added line for database since 'post' is used
const bodyParser = require('body-parser');
const app = express();
// for login database
const session = require('express-session');

// Checks if the user is logged in based on the req information.
function isLoggedIn(req) {
	return req.session.currentUser !== null && typeof req.session.currentUser !== 'undefined';
}

// Checks that a string is defined, not null and isn't a blank string.
function hasContents(string) {
	return typeof string !== 'undefined' && string !== null && string !== "";
}

//if the user is not logged in redirect them to the login page

//  Set the view engine to read EJS files for templating
app.set('view engine', 'ejs');

// All files in the public folder are displayed as-is with no inline JavaScript
app.use(express.static(__dirname + '/public'));

// line for database
app.use(session({ secret: 'example'}));
app.use(bodyParser.urlencoded({extended: true}));

// Constructs a query to be passed to MongoDB
function getMongoQuery(req) {
	// Blank object, query is built using data below
	var query = {};

	// If location is defined, add it to query
	if (hasContents(req.query.loc)) {
		// Add the $and field if this query is used
		if (Object.keys(query).length === 0) {
			query.$and = [];
		}

		// Regex which checks that the user string is a subset of other strings in the database
		// The 'i' means that the query is case insensitive, so 'M' and 'm' are treated the same.
		query.$and.push({name: {"$regex":req.query.loc, "$options": "i"}});
	}

	// If price is defined, add it to query
	if (hasContents(req.query.price)) {
		// Add the $and field if this query is used
		if (Object.keys(query).length === 0) {
			query.$and = [];
		}

		// parseFloat is used so the price is not a string.
		// $lte means less than or equal to. In other words, this is the maximum price which will be displayed in results
		query.$and.push({"price": {"$lte": parseFloat(req.query.price)}});
	}

	return query;
}

// Initial page, this is our root route
app.get('/', (req, res) => {
	var query = getMongoQuery(req);

	// If a query has been made by the user, perform it and return the result to EJS,
	// else, render the home page without search results.
	if (Object.keys(query).length > 0) {
		var locations = db.collection('locations');

		// Search the locations collection using the user's string
		locations.find(query).toArray(function(err, result) {
			res.render( 'home', {
				title: 'Home',
				queryDefined: true, spots: result, user: req.session.currentUser
			});
		});

	} else {
		res.render( 'home', { title: 'Home', queryDefined: false, spots: [], user: req.session.currentUser });
	}

});

// A JSON file generated from a MongoDB query for spaces
app.all('/json/query.json', function(req, res) {
	var query = getMongoQuery(req);

	// If a query has been made by the user, perform it and return the result to EJS,
	// else, render the home page without search results.
	if (Object.keys(query).length > 0) {
		var locations = db.collection('locations');

		// Search the locations collection using the user's string
		locations.find(query).toArray(function(err, result) {
			res.render( 'json/query', {result: result});
		});

	} else {
		res.render( 'json/query', {result: {}});
	}
});

//  About Page
app.all('/about', (req, res) => {
	res.render( 'about', { title: 'About', user: req.session.currentUser } );
});

//  Help Page
app.all('/help', (req, res) => {
	res.render( 'help', { title: 'Help', user: req.session.currentUser });
});

//  Sign up Page
app.get('/register', function(req, res) {
	// If a user is not logged in, show them the register page.
	if (typeof req.session.currentUser === 'undefined' || req.session.currentUser === null) {
		res.render( 'register', {title: 'Sign up'});
	} else {
		res.redirect('/'); // Logged in users do not need an account.
	}
});

var db;

MongoClient.connect(url, function(err, database) {
	if (err) throw err;
	db = database;
	app.listen(8080);
	console.log('listening on 8080');
});

// start of Get Routes

// Page for adding locations to the map
app.get('/add', function(req, res){
	if (isLoggedIn(req)) {
		res.render('add', {title: "Add Location", user: req.session.currentUser});
	} else {
		res.redirect('/');
	}
});

//start of Post Routes, mostly actions which affect the session or database and redirect to the homepage

// db stuff for user_inputed_locations
app.post('/locations', function(req, res) {
    if (isLoggedIn(req)) {
		var newLocation = {
			name: req.body.name,
			type: req.body.type,
			lat: parseFloat(req.body.lat),
			long: parseFloat(req.body.long),
			price: req.body.price
		};

		console.log(req.body.lat);
		console.log(req.body.long);

		db.collection('locations').save(newLocation, function(err, result) {
			if (err) throw err;
			//console.log('location added to database')
			res.redirect('/')
		 });
	 } else {
		 res.redirect('/');
	 }
 });

// the dologin route which takes data from our login page
// post variables, username and password
app.post('/dologin', function(req,res){
	var username = req.body.username;
	var password = req.body.password;

	db.collection('users').findOne({"login.username" : username}, function(err,result) {
		//if there is an error return, throw error
		if (err) throw err;
		//if there is no result, direct user back to login page. username does not exist then
		if (!result) {
			res.redirect('/');
			return;
		}

		// if there is a result then check the password, if its correct set session loggedin to true
		// and send them to the home page, else send user back to login page
		if (result.login.password == password) {
			req.session.currentUser = username;
			res.redirect('/');
		} else {
			res.redirect('/');
		}
	});
});

// Logs the user out
app.all('/dologout', function(req,res) {
	req.session.currentUser = null;
	res.redirect('/');
});

// Adds a user to the FindSpot database
app.post('/doregister', function(req, res) {
	// A string containing only characters between 0 and 9, A and Z (case insensitive) and at least one character.
	const alphaNumericRegex = /^[0-9a-z]+$/i;

	// Add a user to the database, TODO add security measures

	// If a user is logged in, skip the registration step (security measure to prevent flooding with accounts)
	if (!isLoggedIn(req) && alphaNumericRegex.test(req.body.username)) {
		db.collection('users').find({"login.username" : req.body.username}).toArray(function(err,result) {
			// If a user does not have this name, sign them up
			if (result.length === 0) {
				console.log("inserting user " + req.body.username);

				db.collection('users').insert({
					"login":{
						"username":req.body.username,
						"password":req.body.password
					}
				});

				// And sign them in
				req.session.currentUser = req.body.username;
			}
		});
	}

	// Redirect to the home page
	res.redirect('/');
});
