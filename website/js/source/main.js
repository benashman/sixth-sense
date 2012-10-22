require(['plugins/log', 'jquery', 'socket.io', 'plugins/paper'], function (log, $) {
	
	var main = {

		heat: 0,

		light: 0,

		showLabels: true,

		init: function () {

			var self = this;

			self.socketConnect();

			if ($(window).width() <= 480) {

				self.showLabels = false;

			}

			// console.log('Main initiated: ', self);

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

				// console.log('Heat data:', self.heat);

			});

			self.socket.on('light', function (data) {

				self.light = parseInt(data.reading / 10);

				// console.log('Light data:', self.light);

			});

		}

	};
	paper.install(window);
	$(document).ready(function () {

		main.init();

		var canvas = $('#dryCanvas')[0];

		paper.setup(canvas);
		
		var stageW = view.size.width;
    	var stageH = view.size.height;

    var lightBg = new Path.Rectangle(0,0, stageW/2, stageH);
    lightBg.fillColor = '#3eb555';
    lightBg.opacity = 0.25;
    
    var heatBg = new Path.Rectangle(stageW/2, 0, stageW/2, stageH);
    heatBg.fillColor = '#d05f0a';
    heatBg.opacity = 0.25;

    var lightRect = new Path.Rectangle(0,stageH, stageW/2, stageH);
    lightRect.fillColor = '#3eb555';
    
    var heatRect = new Path.Rectangle(stageW/2, stageH, stageW/2, stageH);
    heatRect.fillColor = '#d05f0a';

    var heatText = new PointText(new Point(stageW - 25, 150));
    heatText.justification = 'right';
    heatText.fillColor = 'white';
    heatText.fontSize = 120;       
    heatText.content = main.heat;   

    var lightText = new PointText(new Point(stageW/2 - 25, 150));
    lightText.justification = 'right';
    lightText.fillColor = 'white';
    lightText.fontSize = 120;
    lightText.content = main.light; 

    if (main.showLabels) {

	    var lightLabel = new Path.Rectangle(0, stageH-150, stageW/2, 150);
	    lightLabel.fillColor = 'black';
	    lightLabel.opacity = 0.6;
	    
	    var heatLabel = new Path.Rectangle(stageW/2, stageH-150, stageW/2, 150);
	    heatLabel.fillColor = 'black';
	    heatLabel.opacity = 0.6; 

	    var heatLabelText = new PointText(new Point((stageW/4)*3, stageH-45));
	    heatLabelText.justification = 'center';
	    heatLabelText.fillColor = 'white';
	    heatLabelText.fontSize = 80;        
	    heatLabelText.content = "Heat";   

	    var lightLabelText = new PointText(new Point(stageW/4, stageH-45));
	    lightLabelText.justification = 'center';
	    lightLabelText.fillColor = 'white';
	    lightLabelText.fontSize = 80;
	    lightLabelText.content = "Light";

	}

    function scrollNum(value, current){ 
        var diff = value - current;
        if(current != value){
            if(diff > 50){
                current = parseInt(current) + 50
            } else if(diff > 10){
                current = parseInt(current) + 10
            } else if(diff > 0){
                current = parseInt(current) + 1
            } else if(diff < 0){
                current = parseInt(current) - 1
            } else if(diff < -10){
                current = parseInt(current) - 10
            } else if(diff < -50){
                current = parseInt(current) - 50
            }
        }
        return current;
    }
    function updateBars(theBar, theVar){
        var range;
        if (theBar == heatRect){
            range = 40;
        } else if (theBar == lightRect) {
            range = 100;
        }
        
       var theHeight = parseInt((stageH * ( 1-(theVar / range))));

        for (var i = 1; i < 3; i++){
             if(theBar.segments[i].point.y != theHeight){
                var vector = (theHeight - theBar.segments[i].point.y) ;
                theBar.segments[i].point.y += parseInt(vector/5);
            }
        }
    }

    view.onFrame = function(event) {
        heatText.content = scrollNum(main.heat, heatText.content);
        lightText.content = scrollNum(main.light, lightText.content);
        updateBars(heatRect, main.heat);
        updateBars(lightRect, main.light);
      
         lightText.position.y = lightRect.segments[1].point.y + 140;
         heatText.position.y = heatRect.segments[1].point.y + 140;
    }
	
	});

});