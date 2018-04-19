var fs = require('fs');

//Append to file
function addTo(filename, content){
	fs.appendFile(filename, content, function(err){
		if (err) throw err;
	});
}

//Open an existing file or create new
function open(filename){
	fs.open(filename, 'w', function(err,file){
		if (err) throw err;
	});
}

function write(filename, content){
	fs.writeFile(filename, content, function(err){
		if (err) throw err;
	});
}

function delete(filename){
	fs.unlink(filename, function(err){
		if (err) throw err;
	});
}

function rename(filename, newFilename){
	fs.rename(filename, newFilename, function(err){
		if (err) throw err;
	});
}
