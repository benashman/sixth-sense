paper.install(window);
window.onload = function() {
    var canvas = document.getElementById('dryCanvas');
    paper.setup(canvas);

    var heatVal = "20";
    var lightVal = 89;
    var heatCur = 7;
    var lightCur = 9;
    
    function randUpdate(){
        return Math.floor(Math.random()*99);
    }

    setInterval(function(){
        heatVal = Math.floor(Math.random() * 40);
        lightVal = Math.floor(Math.random()*100);
    },3000);

    var stageW = view.size.width;
    var stageH = view.size.height;

    var lightRect = new Path.Rectangle(0,stageH, stageW/2, stageH);
    lightRect.fillColor = '#3eb555';

    
    var heatRect = new Path.Rectangle(stageW/2, stageH, stageW/2, stageH);
    heatRect.fillColor = '#d05f0a';

    var heatText = new PointText(new Point(stageW - 25, 150));
    heatText.justification = 'right';
    heatText.fillColor = 'white';
    heatText.fontSize = 120;        
    heatText.content = heatVal;   

    var lightText = new PointText(new Point(stageW/2 - 25, 150));
    lightText.justification = 'right';
    lightText.fillColor = 'white';
    lightText.fontSize = 120;
    lightText.content = lightVal;  

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
        
       var theHeight = parseInt((stageH * (theVar / range)));
       
        
         for (var i = 1; i < 3; i++){
             if(theBar.segments[i].point.y != theHeight){
                 var vector = (theHeight - theBar.segments[i].point.y) ;
                 theBar.segments[i].point.y += vector/5;
             }
         }
    }

    view.onFrame = function(event) {
        heatText.content = scrollNum(heatVal, heatText.content);
        lightText.content = scrollNum(lightVal, lightText.content);
        updateBars(heatRect, heatVal);
        updateBars(lightRect, lightVal);
      
         lightText.position.y = lightRect.segments[1].point.y + 140;
         heatText.position.y = heatRect.segments[1].point.y + 140;
    }
}