# mqtt-ws
Show real time data from broker to web page

To Test:

(1) Connect to broker.hivemq.com form MQTT LENS
(2) Open index.html in browser
(3) Publish to 
topic: srdl/info-test/  
msg: {"device_data": 100}
(4) You shuld see 100 in you browser
(5) For debug check "console" from "Inspect"
