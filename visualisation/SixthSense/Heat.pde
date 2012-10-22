
class Heat extends Element {
  
//  private Layer[] layers;

  Heat () {
    super("Heat");
    lastReading = 20.0;
  }
  
    public void update() {
    Flower flower;
//    if(inTransition){
      for(int i=0; i<amountFlowers; i++){
        flower = flowers[i];
        int index = flower.getColourIndex();
        int[] newValues;
        if(getTier() >= 0){
          newValues = palettes[getTier()].getColourValues(index);
        }
        else {
          newValues = new int[3];
          newValues[0] = newValues[1] = newValues[2] = 6;
        }
        flowers[i].setNewValues(newValues);
      }
//      inTransition = false;
//    }

  }
  
  public int getTier(){
    if(lastReading > 1.0 && lastReading <= 14.0) {
      return 0;
    }
    else if(lastReading > 14.0 && lastReading <= 21.0) {
      return 1;
    }
    else if(lastReading > 21.0 && lastReading <= 24.0){
      return 2;
    }
    else if(lastReading > 24.0 && lastReading <= 28.0){
      return 3;
    }
    else if(lastReading > 28.0){
      return 4;
    }
    else {
      return -1;
    }
  }
  
  public void increase() {
    lastReading += 1.0;
    println(definition + ": " + lastReading);
  }
  
  public void decrease() {
    lastReading -= 1.0;
    println(definition + ": " + lastReading);
  }
  
  public void desaturate() {
    for(int i=0; i<amountFlowers; i++){
      int[] black = new int[3];
      black[0] = black[1] = black[2] = 0;
      flowers[i].setNewValues(black);
    }
  }
  
  public void toggle() {
    super.toggle();
    if(!active){
      desaturate();
    }
  }
  
}

