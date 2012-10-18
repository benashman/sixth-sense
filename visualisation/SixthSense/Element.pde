
class Element {
  
  boolean active;
  float lastReading;
  String definition;
  
  Element (String type) {
    definition = type;
    println(type + " created.");
  }
  
  public boolean isActive() {
    return active;
  }
  
  public float getCurrent() {
    return lastReading;
  }
  
  public void feedValue(float val) {
    lastReading = val;
    println(definition + ": " + val);
  }
  
  public void toggle() {
    if(active){
      active = false;
      println(definition + " is now INACTIVE");
    }
    else {
      active = true;
      println(definition + " is now ACTIVE");
    }
  }
  
  public void update() {

  }
  
}


//class Layer {
//
//  float myHeight;
//  float y = 0;
//  float r = 0;
//  float g = 0;
//  float b = 0;
//  float newR = 0;
//  float newG = 0;
//  float newB = 0;
//  
//  Layer(float offset) {
//    y = offset;
//    myHeight = random(height / 5);
//  }
//  
//  void update() {
//    stroke(255);
//    fill(r,g,b);
//    rect(0, y, width, myHeight);
//  }
//  
//  void applyColour() {
//    println("Apllying new colour..");
//  }
//
//}

class Palette {

  public color[] colours;
  
  Palette(XML node) {
    XML[] children = node.getChildren("colour");
    colours = new color[5];
    
    for(int i=0; i<5; i++){
      float r = children[i].getInt("r");
      float g = children[i].getInt("g");
      float b = children[i].getInt("b");
      colours[i] = color(r,g,b);
    }
  }
  
  public color getColour(int index) {
    return colours[index];
  }
  
  public int[] getColourValues(int index){
    color c = colours[index];
    int[] result = new int[3];
    result[0] = int(red(c));
    result[1] = int(green(c));
    result[2] = int(blue(c));
    return result;
  }
  
  public color getBackground() {
    return colours[0];
  }
  
}

