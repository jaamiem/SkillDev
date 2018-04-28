var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/users';

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	res.send('Hello World!');
});

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}...`))
