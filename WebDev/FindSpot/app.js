//  Include Express and set it to app
var express = require('express');
var ejs = require('ejs');

var app = express();

//  Set the view engine to read EJS files for templating
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

//  Initial page
app.get('/', (req, res) => {
	res.render('home');
});

app.get('/about', (req,res) => {
	res.render('about');
})

app.get('/help', (req,res) => {
	res.render('help');
})

app.listen(8080);
