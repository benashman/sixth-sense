var	net = require('net'),
	netServer,
	client = null;

netServer = net.createServer(function (stream) {

	client = stream;

	stream.setTimeout(0);
	
	stream.setEncoding('utf8');
	
	stream.on('connect', function () {

		console.log('*** The Arduino has joined! ***\n');
    
	});

	stream.on('data', function (data) {

		data = data.toString('utf8');

		console.log("Arduino sent: " + data);

	});
  
	stream.on('end', function () {

		console.log('*** Arduino has left! ***\n');

		stream.end();

		client = null;

	});

});

netServer.listen(8888);