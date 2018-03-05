//variables
const EventEmitter = require('events');
const emitter = new EventEmitter();

var url = "http://mylogger.io/log";

class Logger extends EventEmitter {
	log(message){
		//send an HTTP request
		console.log(message);

		//Raise an Event
		this.emit('messageLogged', { data: "Shoobity Boopity Bop"});
	}
}

module.exports = Logger;
