const express = require('express');
const app = express();

app.use(express.json());

const courses = [
	{ id: 1, name: 'course1'},
	{ id: 2, name: 'course2'},
	{ id: 3, name: 'course3'}
];

app.use(express.static(__dirname + '/public'));

//  INDEX PAGE
app.get('/', (req,res) => {
	res.render('index');
});

//  PRINT COURSES
app.get('/api/courses', (req,res) => {
	res.send(courses);
});

//  ADD AND VALIDATE NEW COURSE
app.post('/api/courses', (req,res) => {
	if (!req.body.name || req.body.name.length < 3) return res.status(400).send('Name wrong innit');

	const course =  {
		id: courses.length + 1,
		name: req.body.name
	}
	courses.push(course);
	res.send(courses);
});

//  FIND COURSE BY ID
app.get('/api/courses/:id', (req,res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('The course disnay exist');
	res.send(course);
});

// UPDATE COURSE
// app.put('/api/courses/:id', (req, res) => {
// 	const course = courses.find(c => c.id === parseInt(req.params.id));
// 	if (!course) res.status(404).send('No Course to Update');
// 	if (!req.body.name || req.body.name.length )
// });

app.delete('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('The course disnay exist');

	const index = courses.indexOf(course);
	courses.splice(index, 1);
});

// PORT
const port = process.env.PORT || 3050;
app.listen(port, () => console.log(`Listening on port ${port}...`));
