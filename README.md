rpidev
======

"Kjell" protocol
======
25 bit message

0-9:
"1111111111" (Unknown)

10-11, outlet A:
"01" = Don't use this outlet
"00" = Use this outlet

12-13, outlet B:

14-15, outlet C:

16-17:
"01" (Unknown)

18-19:
"01" (Unknown)

20:
"0" (Unknown)

21-24:
"1000" = ON
"0010" = OFF

Only one outlet may be activated/deactivated per message.

bit "0":
High 450 microseconds
Low 150 microseconds

bit "1":
Low 450 microseconds
High 150 microseconds

Terminate each message with Low 32*150 microseconds
Send each message 8 times