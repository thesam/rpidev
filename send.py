import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.OUT)

while True:
	print ' Sending GPIO.HIGH'
	GPIO.output(11, GPIO.HIGH)
	print 'Sending GPIO.LOW'
	GPIO.output(11, GPIO.LOW)
