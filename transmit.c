#include <wiringPi.h>
#include <stdio.h>
#include <string.h>

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

void a() {
    high(LONG);
    low(SHORT);
}

void b() {
    high(SHORT);
    low(LONG);
}

void console(char* msg) {
    printf("%s\n",msg);
}

void kjell(char* msg) {
    int i = 0;
    int j = 0;
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 25; j++) {
            if (msg[j] == '1') {
                a();
            } else {
                b();
            }
        }
        low(VERYLONG);
    }
}

void kjellOn(char outlet) {
    char msg[] = "1111111111010101010101000";
    if (outlet == 'A') {
        console("Kjell - Outlet A : ON");
        msg[11] = '0';
    }
    if (outlet == 'B') {
        console("Kjell - Outlet B : ON");
        msg[13] = '0';
    }
    if (outlet == 'C') {
        console("Kjell - Outlet C : ON");
        msg[15] = '0';
    }
    kjell(msg);
}

void kjellOff(char outlet) {
    char msg[] = "1111111111010101010100010";
    if (outlet == 'A') {
        console("Kjell - Outlet A : OFF");
        msg[11] = '0';
    }
    if (outlet == 'B') {
        console("Kjell - Outlet B : OFF");
        msg[13] = '0';
    }
    if (outlet == 'C') {
        console("Kjell - Outlet C : OFF");
        msg[15] = '0';
    }
    kjell(msg);
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

// http://stackoverflow.com/questions/111928/is-there-a-printf-converter-to-print-in-binary-format
#define kDisplayWidth 25

char* pBinFill(long int x,char *so, char fillChar)
{ // fill in array from right to left
 char s[kDisplayWidth+1];
 int  i=kDisplayWidth;
 s[i--]=0x00;   // terminate string
 do
 { // fill in array from right to left
  s[i--]=(x & 1) ? '1':'0';
  x>>=1;  // shift right 1 bit
 } while( x > 0);
 while(i>=0) s[i--]=fillChar;    // fill with fillChar
 sprintf(so,"%s",s);
 return so;
}

int main ( int argc, char *argv[] )
{
    init();
    if (argc == 1) {
        if (strcmp(argv[1],"demo") == 0) {
            nexaOn();

            kjellOn('A');
            delay(500);
            kjellOn('B');
            delay(500);
            kjellOn('C');
            delay(500);
            kjellOff('A');
            delay(500);
            kjellOff('B');
            delay(500);
            kjellOff('C');

            nexaOff();
        }
    }

    if (argc == 4) {
        if (strcmp(argv[1],"kjell") == 0) {
            char outlet = argv[2][0];
            if (strcmp(argv[3],"on") == 0) {
                kjellOn(outlet);
            }
            if (strcmp(argv[3],"off") == 0) {
                kjellOff(outlet);
            }
        }
     }

     if (argc == 5) {
        if (strcmp(argv[1],"nexa") == 0) {
            char *group = argv[2];
            char *number = argv[3];
            char *command = argv[4];
            printf("input = ", *group, *number, *command);
        }
    }

    cleanup();
}
