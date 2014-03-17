import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.OUT)

while True:
	
	GPIO.output(11, GPIO.HIGH)
	print 'Sending GPIO.LOW'
	GPIO.output(11, GPIO.LOW)


def o():
	
	
