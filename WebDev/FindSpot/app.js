//  Include Express and set it to app
var express = require('express');
var ejs = require('ejs');

var app = express();

var spots = [
	{
		name: "College Street Car Park",
		lat: 57.142736,
		lng: -2.099031
	},
	{
		name: "Crown Terrace",
		lat:57.144050,
		lng:-2.101225
	}
]

//  Set the view engine to read EJS files for templating
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

//  Initial page
app.get('/', (req, res) => {
	res.render('home', { spots: spots });
});

//  About Page
app.get('/about', (req,res) => {
	res.render('about');
})

//  Help Page
app.get('/help', (req,res) => {
	res.render('help');
})

app.listen(8080);
