import processing.serial.*;

Palette[] palettes;
Light lightViz;
Heat heatViz;
Flower[] flowers;
int amountFlowers;
int greenRating;
color backgroundColour;
boolean inTransition;

Serial myPort; 

float fov;
float cameraZ;

void setup() {
  size(displayWidth, displayHeight, P3D);
  smooth();
  
  String portName = Serial.list()[6];
  myPort = new Serial(this, portName, 9600);
  
  XML xml = loadXML("data/swatches.xml");
  XML[] children = xml.getChildren("palette");
  palettes = new Palette[5];
  for (int i=0; i<5; i++){
    palettes[i] = new Palette(children[i]);
  }
  
  amountFlowers = 600;
  flowers = new Flower[amountFlowers];
  for(int i=0; i<amountFlowers; i++){
    flowers[i] = new Flower(-i*50 + random(width + i*100), -i*50);
  }
  
  lightViz = new Light();
  heatViz = new Heat();
  
  fov = PI/3.0;
  cameraZ = (height/2.0) / tan(fov/2.0);
  greenRating = -1;
  backgroundColour = color(0);
//  setupDashboard();
}

void draw() {
  if(heatViz.isActive() && heatViz.getTier() >= 0){
    backgroundColour = palettes[heatViz.getTier()].getBackground();
  }
  else {
    backgroundColour = color(0);
  }
  background(backgroundColour);
//  fill(backgroundColour);
//  stroke(255);
//  beginShape(QUADS);
//  vertex(0,height,0);
//  vertex(0,height,-20);
//  vertex(10,height,-20);
//  vertex(10,height,0);
  endShape();
  lights();

  perspective(fov, width/height, cameraZ/100.0, cameraZ*100.0);
  pointLight(255, 255, 255, 0, 0, 50);
  translate(50, height, 0);

//  rotateX(-PI/12);
//  rotateY(PI/3.5);
//  counter += 0.1;
//  lightViz.feedValue(1000 * sin(counter) + 1000);

  if(heatViz.isActive()){
    heatViz.update();
  }
  if(lightViz.isActive()){
    lightViz.update();
  }
  
  for(int i=0; i<amountFlowers; i++){
    flowers[i].place(); 
  }
  
  noCursor();
}

void keyReleased() {
  if (keyCode == UP) {
//      greenRating++;
//      println("Green Rating goes up!");
    heatViz.increase();
    inTransition = true;
  } 
  else if (keyCode == DOWN) {
//    greenRating--;
//    println("Green Rating goes down!");
//    greenRating = (greenRating < -1) ? -1 : greenRating;
    heatViz.decrease();
    inTransition = true;
  }
  else if (keyCode == LEFT) {
    lightViz.toggle();
  }
  else if (keyCode == RIGHT) {
    heatViz.toggle();
  }
}

void serialEvent(Serial myPort) {
  try {
    if(myPort.available() > 0){
      String input = myPort.readStringUntil('\n');
      if(input != null){
        if(input.charAt(0) == '0'){
          heatViz.feedValue(float(input.substring(2)));
        }
        else if(input.charAt(0) == '1'){
          lightViz.feedValue(float(input.substring(2)));
        }
      }
    }
  } catch (NullPointerException e) {
    println("No Connection.");
  }
}

boolean sketchFullScreen() {
  return true;
}
