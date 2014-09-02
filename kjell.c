#include <wiringPi.h>
#include <stdio.h>

#define SHORT 150
#define LONG (3*SHORT)
#define VERYLONG (32*SHORT)

void high(int delay){
	digitalWrite (0, HIGH) ; delayMicroseconds (delay) ;
}

void low(int delay){
	digitalWrite (0, LOW) ; delayMicroseconds (delay) ;
}

void init() {
	wiringPiSetup();
	pinMode(0, OUTPUT);
}

void cleanup() {
	low(0);
}

void lightOn() {
	int i = 0;
	for (i = 0; i < 8; i++) {
		high(LONG);
		low(SHORT);
		high(LONG);
		low(SHORT);
		high(LONG);
		low(SHORT);
		high(LONG);
		low(SHORT);
		high(LONG);
		low(SHORT);
		high(LONG);
		low(SHORT);
		high(LONG);
		low(SHORT);
		high(LONG);
		low(SHORT);
		high(LONG);
		low(SHORT);
		high(LONG);
		low(SHORT);
		high(SHORT);
		low(LONG);
		high(SHORT);
		low(LONG);
		high(SHORT);
		low(LONG);
		high(LONG);
		low(SHORT);
		high(SHORT);
		low(LONG);
		high(LONG);
		low(SHORT);
		high(SHORT);
		low(LONG);
		high(LONG);
		low(SHORT);
		high(SHORT);
		low(LONG);
		high(LONG);
		low(SHORT);
		high(SHORT);
		low(LONG);
		high(LONG);
		low(SHORT);
		high(SHORT);
		low(LONG);
		high(SHORT);
		low(LONG);
		high(SHORT);
		low(VERYLONG);
	}
}

int main ( int argc, char *argv[] )
{
    init();
    cleanup();
}
