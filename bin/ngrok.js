#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var natapp = path.join(__dirname, 'natapp');
var fs = require('fs');

program
  .version('0.0.1')
  .option('-a, --authtoken [authtoken]', 'authtoken')
  .parse(process.argv);

function execNatapp(token){
	var child = require('child_process');
	var du = child.spawn(natapp, ['-authtoken='+token]);

	du.on('exit', function (code) {
	    console.log('child process exited with code ' + code);
	});

	fs.writeFile('./cache.txt', token, function (err) {
	  if (err) throw err;
	});	
}

if (program.authtoken) {
	console.log('execute with token '+program.authtoken)
	execNatapp(program.authtoken);
}else{
	var authtoken = fs.readFileSync('./cache.txt','UTF-8');
	if (authtoken && authtoken!='') {
		console.log('execute with cache token '+authtoken)
		execNatapp(authtoken);
	} else {
	    program.help();
	    console.log();
	}
}
