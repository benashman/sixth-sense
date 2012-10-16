var server = require('http').createServer(handler),
	io = require('socket.io').listen(server),
	net = require('net'),
	netServer,
	light = {
		status: null,
		range: 0
	},
	client = null,
	users = {},
	userCount = 0;

server.listen(8080);

function handler (req, res) {

	res.end('Get that dirty thing out of my socket...');

    res.writeHead(200);

	res.end(data);

}

io.sockets.on('connection', function (socket) {

	userCount++;

	users[socket.id] = {

		id: socket.id,

		username: 'unnamed_' + userCount

	};

	console.log('User joined: ', users);

	socket.emit('join', users[socket.id]);

	socket.on('click', function (data) {

		console.log('From click channel', data);

		io.sockets.emit('click', data);

	});

	socket.on('disconnect', function () {

		delete users[socket.id];

		console.log('User left: ', users);

	});

	socket.on('namechange', function (data) {

		if (uniqueName(data.name)) {

			// update all users to have correct username

			socket.emit('namechange', {successful: true});

		} else {

			socket.emit('namechange', {successful: false});

		}

	});

	socket.on('light', function (data) {

		console.log('Light change: ', data);

		if (data.hasOwnProperty('lightState')) {

			if (data.lightState === 'on') {

				light.status = 'on';

				if (client !== null) { 

					client.write('on!\n');

				}

			} else {

				light.status = 'off';

				if (client !== null) {

					client.write('off!\n');

				}

			}

		} else if (data.hasOwnProperty('lightRange')) {

			if (data.lightRange > 0 && light.range < 255) {

				light.range += data.lightRange;

				if (light.range > 255) {

					light.range = 255;

				}

			} else if (data.lightRange < 0 && light.range > 0) {

				light.range += data.lightRange;

				if (light.range < 0) {

					light.range = 0;

				}

			}

			if (client !== null) {

				client.write(light.range + '!\n');

			}

		}

	});

});

// (function metronome () {

// 	var timeout = setTimeout(function () {

// 		metronome();

// 		io.sockets.emit('metronome');

// 	}, metronomeDelay);

// })();

// function chainEmit (data) {

// 	// go from our index to end, and then start to our index

// 	var id = data.id,
// 		usersArray = [],
// 		i,
// 		j;

// 	for (i in users) {

// 		if (users.hasOwnProperty(i) === true) {

// 			usersArray.push(users[i]);

// 		} 

// 	}

// 	for (i = usersArray.indexOf(id), j = usersArray.length; i < j; i++) {

// 		users[usersArray[i]].socket.emit('click', );

// 	}

// }

function uniqueName (name) {

	var unique = true;

	for (var i in users) {

		if (users.hasOwnProperty(i)) {

			if (users[i].username === name) {

				unique = false;

			}

		} 

	}

	return unique;

}

netServer = net.createServer(function (stream) {

	client = stream;

	stream.setTimeout(0);
	
	stream.setEncoding('utf8');
	
	stream.addListener('connect', function () {

		console.log('*** The Arduino has joined! ***\n');
    
	});
  
	stream.addListener('end', function () {

		console.log('*** Arduino has left! ***\n');

		stream.end();

		client = null;

	});

});

netServer.listen(8081);