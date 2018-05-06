const express = require('express');
const bodyparser = require('body-parser');
// const mongoose = require('mongoose');
const app = express();

// mongoose.connect('mongodb://admin:' + process.env.MONGO_ATLAS_PW + '@usersite-shard-00-00-jiqyw.mongodb.net:27017,usersite-shard-00-01-jiqyw.mongodb.net:27017,usersite-shard-00-02-jiqyw.mongodb.net:27017/test?ssl=true&replicaSet=UserSite-shard-0&authSource=admin')

app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req,res) => {
	res.render('index');
});

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}...`));
