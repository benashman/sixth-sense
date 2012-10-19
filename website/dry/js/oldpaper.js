
var currentHeat = 75;
var currentLight = 64;



function r(limit){
    return Math.floor(Math.random()*limit);
}

function randUpdate(){
    // var rand = r(15);
    // if(r(2) == 0){
    //     return +rand;
    // } else {
    //     return -rand;
    // }
    return r(99);
}

    setInterval(function(){
        //currentLight += randUpdate();
        currentHeat = randUpdate();
    },3000);
    
    // var diagLine = new Path();
    // diagLine.strokeColor = 'black';
    // var start = new Point(currentHeat, currentLight);
    // diagLine.moveTo(start);
    // diagLine.lineTo(start + [ (currentHeat*2), (currentLight*2) ]);

    

    // var rect = new Rectangle( 100, 100, 500, 500);
    // rect.fillColor = 'green';
    // console.log(rect);

    // var circle = new Path.Circle(new Point(80, 50), 30);
    // circle.fillColor = 'green';

    
    var pathRect = new Path.Rectangle(0,0, view.size.width, view.size.height);
    pathRect.fillColor = 'black';
    console.log(pathRect);

    // var textLight = new PointText(new Point(500, 100));
    // textLight.justification = 'center';
    // textLight.fillColor = 'black';
    // textLight.content = currentLight;

    var textHeat = new PointText(new Point(view.size.width - 25, 300));
    textHeat.justification = 'right';
    textHeat.fillColor = 'white';
    textHeat.fontSize = 150;
    textHeat.content = currentHeat;
    

    function scrollNum(val, text){ 
        var diff = val - text;
        if(text != val){
            if(diff > 0){
                text = parseInt(text) + 1
            } else if(diff < 0){
                text = parseInt(text) - 1
            }
        }
        return text;
    }
    
    var theHeight;

    function onFrame(event) {
        textHeat.content = scrollNum(currentHeat, textHeat.content);
        theHeight = (view.size.height * (currentHeat / 100));
        //pathRect.segments[1].point.y =  theHeight;
        //pathRect.segments[2].point.y = theHeight;
        for (var i = 1; i < 3; i++){
            if(pathRect.segments[i].point.y != theHeight){
                var vector = theHeight - pathRect.segments[i].point.y;
                pathRect.segments[i].point.y += vector/5;
            }
        }
        textHeat.position.y = pathRect.segments[1].point.y + 180;
        

        //textLight.content = scrollNum(currentLight, textLight.content);
        

        //textHeat.content = currentHeat;
        //textLight.content = currentLight;
        // circle.fillColor.hue += 1;
        // pathRect.size = (currentHeat, currentLight);
        // if(pathRect.bounds.height != currentHeat){
        //     var vector = currentHeat - pathRect.position.y;
        //     pathRect.bounds.height += vector/5;
        // }
        //pathRect.scale(1,2);
        //textHeat.position = pathRect.position.centerTop - 50;
    }

    

    function onResize(event) {
        // Whenever the view is resized, move the pathRect to its center:
        //pathRect.size.width = view.size.width;
        //console.log(pathRect.width);
    }