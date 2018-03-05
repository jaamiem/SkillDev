
//______________Events__________________
const EventEmitter = require('events');

const Logger = require('./logger.js');
const logger = new Logger();

//Register a listener
logger.on('messageLogged', (arg) => {
	console.log('Logging', arg);
});

logger.log('message');




//______________File System_____________________
// const fs = require('fs');
//
// // const files = fs.readdirSync('./');
// // console.log(files);
//
// fs.readdir('$', function(err,files) {
// 	if(err) console.log('Error', err);
// 	else console.log('Result', files);
// });




//______________Show Memory CMD________________
// const path = require('path');
// const os = require('os');
//
// var totalMem = os.totalmem()
// var freeMem = os.freemem()
//
// // console.log('Total Mem: ' + totalMem);
//
// //template string
//
// console.log(`Total Memory: ${totalMem}`);
// console.log(`Free Memory: ${freeMem}`);
