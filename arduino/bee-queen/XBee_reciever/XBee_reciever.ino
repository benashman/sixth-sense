#define statusLED 13

String message;

String sensorID; 

int lightThreshold  = 100;
int tempThreshold   = 100;

void setup() {

  Serial.begin(9600);

  pinMode(statusLED, OUTPUT);

}

void loop() {

  while (Serial.available() > 0) {

    char c = Serial.read();

    //We're at the end of the line
    if ( c == '!' ) {

      Serial.print(sensorID);
      Serial.print(": ");
      Serial.print(message);

      message = "";

    //Get the sensor ID
    } else if ( c == ' ') {

      sensorID = message;

      message = "";

    } else {

      message.concat(c);

    }

  }

}


