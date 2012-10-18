class Flower {
  
  float xPos;
  float zPos;
  float rotation = 0;
  float r = 6;
  float g = 6;
  float b = 6;
  float newR = 6;
  float newG = 6;
  float newB = 6; 
  int colourIndex;
  float phase;
  float modifier = 0.0;
  
  Flower(float x, float z) {
    xPos = x;
    zPos = z;
    rotation = random(TWO_PI);
    phase = random(TWO_PI);
    colourIndex = int(random(4));
//    if(greenRating >= 0){
//      fill(palettes[].getColour(colourIndex));
//    }
  }
  
  void place() {
//    stroke(128);
    noStroke();
    transition();
    fill(r,g,b);
    pushMatrix();
    translate(xPos, 0 - (modifier * 10), zPos);
    rotateY(rotation);
    
    box(40 + (modifier), 40 + (modifier * 10), 40 + (modifier));
    //drawPyramid(40);
    popMatrix();
  }
  
  public int getColourIndex() {
    return colourIndex;
  }
  
  public void wiggle(int bounciness) {
    phase += 0.1;
    modifier = bounciness * sin(phase);
  }
  
  public void setNewValues(int[] values) {
    newR = values[0];
    newG = values[1];
    newB = values[2];
  }
  
  void transition() {
    if(r != newR) {
      if(r < newR) { r++; }
      else if(r > newR) { r--; }
    }
    if(g != newG) {
      if(g < newG) { g++; }
      else if(g > newG) { g--; }
    }
    if(b != newB) {
      if(b < newB) { b++; }
      else if(b > newB) { b--; }
    }
  }
  
}

