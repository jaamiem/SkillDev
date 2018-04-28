const express = require('express');
const app = express();

const courses = [
	{ id: 1, name: 'course1'},
	{ id: 2, name: 'course2'},
	{ id: 3, name: 'course3'}
];

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	res.render('index');
})

app.get('/api/courses', (req,res) => {
	res.send(courses);
})

app.get('/api/courses/:id', (req,res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send('The course disnay exist');
	res.send(course);
})

// PORT
const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}...`));
