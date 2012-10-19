#include <SPI.h>
#include <WiFly.h>

#include "credentials.h"

byte server[] = {178, 79, 187, 163};

WiFlyClient client(server, 8081);

#define statusLED 13

String message;
String sensorID; 

bool wiflyConnected = false;

int lightThreshold = 100;
int tempThreshold = 100;

void setup () {

  Serial.begin(9600);

  WiFly.begin();

  if (WiFly.join(ssid, passphrase, true)) {

    wiflyConnected = true;

    delay(1000);

    Serial.println("Connecting...");

    if (client.connect()) {

      Serial.println("Connected.");

    } else {

      Serial.println("Connection to client failed.");

    }

  } else {

    Serial.println("Connection to WiFi failed.");

  }

  Serial.print("wiflyConnected: ");
  Serial.println(wiflyConnected);

  pinMode(statusLED, OUTPUT);

}

void loop () {

  while (Serial.available() > 0) {

    char c = Serial.read();

    //We're at the end of the line
    if (c == '!') {

      Serial.print(sensorID);
      Serial.print(" ");
      Serial.println(message);

      if (wiflyConnected == true) {

        client.println(sensorID + " " + message);

      }

      message = "";

    //Get the sensor ID
    } else if (c == ' ') {

      sensorID = message;

      message = "";

    } else {

      message.concat(c);

    }

  }

}