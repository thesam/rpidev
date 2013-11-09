import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BOARD)
GPIO.setup(13, GPIO.IN)

while True:
	GPIO.wait_for_edge(13, GPIO.BOTH)
	print GPIO.input(13)
