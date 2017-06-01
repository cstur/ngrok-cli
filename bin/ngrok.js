#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var natapp = path.join(__dirname, 'natapp');
var cahefilePath = path.join(__dirname, 'cache.txt');
var fs = require('fs');

program
  .version('1.0.2')
  .option('-a, --authtoken [authtoken]', 'authtoken')
  .parse(process.argv);

function execNatapp(token){
	var child = require('child_process');
	var du = child.spawn(natapp, ['-authtoken='+token]);

	du.on('exit', function (code) {
	    console.log('child process exited with code ' + code);
	});

	fs.writeFile(cahefilePath, token, function (err) {
	  if (err) throw err;
	});	
}

function help(){
    program.help();
    console.log();
}

if (program.authtoken) {
	console.log('execute with token '+program.authtoken)
	execNatapp(program.authtoken);
}else{
	try{
		var authtoken = fs.readFileSync(cahefilePath,'UTF-8');
		if (authtoken && authtoken!='') {
			console.log('execute with cache token '+authtoken)
			execNatapp(authtoken);
		} else {
		    help();
		}
	}catch(err){
		help();
	}
}
