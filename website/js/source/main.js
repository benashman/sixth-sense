require(['plugins/log', 'jquery', 'socket.io', 'plugins/jquery.easing', 'plugins/jquery.color'], function (log, $) {
	
	var main = {

		heat: {

			value: 0,

			max: 30,

			$value: $('#heat .value'),

			$element: $('#heat .column')

		},

		light: {

			value: 0,

			max: 100,

			$value: $('#sound .value'),

			$element: $('#sound .column')

		},

		$canvas: $('#canvas'),

		width: $(window).width(),

		height: $(window).height(),

		init: function () {

			var self = this;

			self.socketConnect();

			//self.randomise();

			console.log('Main initiated: ', self);

		},

		socketConnect: function () {

			var self = this;

			self.socket = io.connect('http://iamsaul.co.uk:8080');

			self.bindSocketEvents();

		},

		bindSocketEvents: function () {

			var self = this;

			self.socket.on('join', function (data) {

				self.user = data;

			});

			self.socket.on('heat', function (data) {

				self.heat = parseInt(data.reading);

				self.animate(self.heat);

				// console.log('Heat data:', self.heat);

			});

			self.socket.on('light', function (data) {

				self.light = parseInt(data.reading / 10);

				self.animate(self.light);

				// console.log('Light data:', self.light);

			});

		},

		animate: function (reading) {

			var self = this;

			if (reading.$value.text() !== reading.value) {

				$({value: reading.$value.text()}).animate({

					value: reading.value

				}, {

					duration: 500,

					step: function () {

						reading.$value.text(Math.round(this.value));

					}

				});

				reading.$element.stop().animate({

					height: ((reading.value / reading.max) * 100) + '%'

				}, 500, 'easeInOutQuad');

			}

		},

		randomise: function () {

			var self = this;

			setTimeout(function () {

				self.heat.value = getRandomInt(10, self.heat.max);

				self.light.value = getRandomInt(30, self.light.max);

				self.animate(self.heat);

				self.animate(self.light);

				self.randomise();

			}, 1000);

			function getRandomInt (min, max) {

				return Math.floor(Math.random() * (max - min + 1)) + min;

			}

		}

	};

	$(document).ready(function () {

		main.init();
	
	});

});