var	server = require('http').createServer(),
	io = require('socket.io').listen(server),
	net = require('net'),
	netServer,
	client = null;

server.listen(8080);

io.sockets.on('connection', function (socket) {

	socket.emit('join', {'hello': 'world'});

});

netServer = net.createServer(function (stream) {

	client = stream;

	stream.setTimeout(0);
	
	stream.setEncoding('utf8');
	
	stream.on('connect', function () {

		console.log('*** The Arduino has joined! ***\n');
    
	});

	stream.on('data', function (data) {

		data = data.toString('utf8');

		var sensorID = data.charAt(0),
			reading = data.split(' ')[1].replace('!', '');

		switch (sensorID) {

			case "0":

				io.sockets.emit('heat', {reading: reading});

				console.log('Heat: ' + reading);

			break;

			case "1":

				io.sockets.emit('light', {reading: reading});

				console.log('Light: ' + reading);

			break;

		}

	});
  
	stream.on('end', function () {

		console.log('*** Arduino has left! ***\n');

		stream.end();

		client = null;

	});

});

netServer.listen(8888);