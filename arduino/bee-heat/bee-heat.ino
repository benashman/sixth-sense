#define heatPin A0
#define sensorID 0

float value = 0;
float voltage = 0;
float celsius = 0;

void setup () {
	
	Serial.begin(9600);

}

void loop () {
	
	value = analogRead(heatPin);

	voltage = value * 5 / 1024.0;

	celsius = (voltage - 0.5) * 10;

	Serial.print(sensorID);

	Serial.print(" ");

	Serial.print(celsius);

	Serial.println("!");

	delay(500);

}