
class Light extends Element {
  
  Light () {
    super("Light");
    lastReading = 750.0;
  }
  
  public void update() {
    Flower flower;
    for(int i=0; i<amountFlowers; i++){
//      flowers[i].rotation += 0.1;
      flowers[i].wiggle(getTier());
    }
  }
  
  public int getTier(){
    if(lastReading <= 100.0) {
      return 3;
    }
    else if(lastReading > 100.0 && lastReading <= 300.0) {
      return 2;
    }
    else if(lastReading > 300.0 && lastReading <= 500.0){
      return 1;
    }
    else {
      return 0;
    }
  }
  
}


