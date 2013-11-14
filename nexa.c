#include <wiringPi.h>
#include <stdio.h>

#define T 350

o(){
    digitalWrite (0, HIGH) ; delayMicroseconds (T) ;
    digitalWrite (0,  LOW) ; delayMicroseconds (3*T) ;
    digitalWrite (0, HIGH) ; delayMicroseconds (T) ;
    digitalWrite (0,  LOW) ; delayMicroseconds (3*T) ;

}

x(){
    digitalWrite (0, HIGH) ; delayMicroseconds (T) ;
    digitalWrite (0,  LOW) ; delayMicroseconds (3*T) ;
    digitalWrite (0, HIGH) ; delayMicroseconds (3*T) ;
    digitalWrite (0,  LOW) ; delayMicroseconds (T) ;

}

stop() {
    digitalWrite (0, HIGH) ; delayMicroseconds (T) ;
    digitalWrite (0,  LOW) ; delayMicroseconds (32*T) ;

}

common() {
	x();o();o();o(); // B
	o();o();o();o(); // 1
	o();x();x();
}

on() {
	common();
	x();
	stop();
}

off() {
	common();
	o();
	stop();
}

int main ( int argc, char *argv[] )
{
  printf("The argument supplied is %s\n", argv[1]);
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
