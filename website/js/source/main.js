require(['plugins/log', 'jquery', 'socket.io'], function (log, $) {
	
	var main = {

		init: function () {

			var self = this;

			self.socketConnect();

			console.log('Main initiated: ', self);

		},

		socketConnect: function () {

			var self = this;

			self.socket = io.connect('http://' + location.hostname + ':8080');

			self.bindSocketEvents();

		},

		bindSocketEvents: function () {

			var self = this;

			self.socket.on('join', function (data) {

				self.user = data;

				console.log('Connected: ', self.user);

			});

			self.socket.on('heat', function (data) {

				console.log('Heat data:', data.reading);

			});

			self.socket.on('light', function (data) {

				console.log('Light data:', data.reading);

			});

		}

	};

	$(document).ready(function () {

		console.log('Hello World.');

		main.init();

	});

});