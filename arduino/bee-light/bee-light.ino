#define lightPin A0
#define sensorID 1

float value = 0;

void setup () {
	
	Serial.begin(9600);

}

void loop () {
	
	value = analogRead(lightPin);

	Serial.print(sensorID);

	Serial.print(" ");

	Serial.print(value);

	Serial.println("!");

	delay(500);

}