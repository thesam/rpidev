#include <wiringPi.h>
#include <stdio.h>

#define T 150

o(){
    digitalWrite (0, HIGH) ; delayMicroseconds (T) ;
    digitalWrite (0,  LOW) ; delayMicroseconds (3*T) ;
}

x(){
    digitalWrite (0, HIGH) ; delayMicroseconds (3*T) ;
    digitalWrite (0,  LOW) ; delayMicroseconds (T) ;

}

stop() {
    digitalWrite (0, HIGH) ; delayMicroseconds (T) ;
    digitalWrite (0,  LOW) ; delayMicroseconds (32*T) ;

}

common() {
	// address, 5 bits, padded with trailing ones = 10 bits
	x();
	x();
	x();
	x();
	x();
	x();
	x();
	x();
	x();
	x();
	// button, 5 bits, padded with leading zeroes = 10 bits
	o();
	o();
	o();
	x();
	o();
	x();
	o();
	x();
	o();
	x();
	//unknown
	o();
	x();
	//on/off

}

on() {
	common();
	o();
	x();
	stop();
}

off() {
	common();
	o();
	o();
	stop();
}

int main ( int argc, char *argv[] )
{
  //printf("The argument supplied is %s\n", argv[1]);
  wiringPiSetup () ;
  pinMode (0, OUTPUT) ;
  for (;;)
  {
	on();on();on();on(); 
	delay(1000);
	off();off();off();off();
	delay(1000);  
	}
}
