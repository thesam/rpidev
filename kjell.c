#include <wiringPi.h>
#include <stdio.h>

h(int T){
	digitalWrite (0, HIGH) ; delayMicroseconds (T) ;
}
l(int T){
	digitalWrite (0, LOW) ; delayMicroseconds (T) ;
}

a() {
	h(450);
	l(150);
}

int main ( int argc, char *argv[] )
{
	//printf("The argument supplied is %s\n", argv[1]);
	wiringPiSetup () ;
	pinMode (0, OUTPUT) ;
	int i = 0;
	for (i = 0; i < 8; i++)
	{
		h(450);
		l(150);
		h(450);
		l(150);
		h(450);
		l(150);
		h(450);
		l(150);
		h(450);
		l(150);
		h(450);
		l(150);
		h(450);
		l(150);
		h(450);
		l(150);
		h(450);
		l(150);
		h(450);
		l(150);
		h(140);
		l(450);
		h(140);
		l(450);
		h(140);
		l(450);
		h(450);
		l(150);
		h(140);
		l(450);
		h(450);
		l(150);
		h(140);
		l(450);
		h(450);
		l(150);
		h(140);
		l(450);
		h(450);
		l(150);
		h(140);
		l(450);
		h(450);
		l(150);
		h(140);
		l(450);
		h(140);
		l(450);
		h(140);
		l(4800);
	}
	l(0);
}
