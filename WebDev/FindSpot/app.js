//  Include Express and set it to app
var express = require('express');
var ejs = require('ejs');

var app = express();

const spots = [
	{
		id: 1,
		name: "College Street Car Park",
		lat: 57.142736,
		lng: -2.099031
	},
	{
		id: 2,
		name: "Crown Terrace",
		lat: 57.144050,
		lng:-2.101225
	},
	{
		id: 3,
		name: "College Street Car Park",
		lat: 57.142736,
		lng: -2.099031
	},
	{
		id: 4,
		name: "Crown Terrace",
		lat: 57.144050,
		lng:-2.101225
	}
]

var page = 0;

//  Set the view engine to read EJS files for templating
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

//  Initial page
app.get('/', (req, res) => {
	res.render('page', { title: 'Home', spots: spots, page: page });
});

//  About Page
app.get('/about', (req,res) => {
	res.render('about', { title: 'About' });
})

//  Help Page
app.get('/help', (req,res) => {
	res.render('help', { title: 'Help' });
})

app.listen(8080);
