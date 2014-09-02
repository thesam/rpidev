#include <wiringPi.h>
#include <stdio.h>

// Kjell
#define SHORT 150
#define LONG (3*SHORT)
#define VERYLONG (32*SHORT)

// Nexa
#define T 350

void high(int duration){
	digitalWrite (0, HIGH) ; delayMicroseconds (duration) ;
}

void low(int duration){
	digitalWrite (0, LOW) ; delayMicroseconds (duration) ;
}

void init() {
	wiringPiSetup();
	pinMode(0, OUTPUT);
}

void cleanup() {
	low(0);
}

void kjellOn() {
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

void o(){
    high(T);
    low(3*T);
    high(T);
    low(3*T);
}

void x(){
    high(T);
    low(3*T);
    high(3*T);
    low(T);
}

void stop() {
    high(T);
    low(32*T);
}

void common() {
	x();o();o();o(); // B
	o();o();o();o(); // 1
	o();x();x();
}

void on() {
	common();
	x();
	stop();
}

void off() {
	common();
	o();
	stop();
}

void nexaOn() {
	on();on();on();on();
}

void nexaOff() {
	off();off();off();off();
}

int main ( int argc, char *argv[] )
{
    if (argc == 4) {
        printf("The argument supplied is %s\n", argv[1]);
        char *group = argv[1];
        char *number = argv[2];
        char *command = argv[3];
        printf("input = ", *group, *number, *command);
    }
    init();
    kjellOn();
    nexaOn();
    delay(1000);
    nexaOff();
    cleanup();
}
