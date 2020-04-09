// These are configs	
var hostname       = "broker.hivemq.com";
var port           = "8000";
var clientId       = "mqtt_js_" + parseInt(Math.random() * 100000, 10);


// Topic to subscribe
var get_data = "srdl/info-test/";


// This is called after the webpage is completely loaded
// It is the main entry point into the JS code

function connect(){
	// Set up the client
	client = new Paho.MQTT.Client(hostname, Number(port), clientId);
	console.info('Connecting to Server: Hostname: ', hostname, 
			'. Port: ', port, '. Client ID: ', clientId);

	// set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;

	// see client class docs for all the options
	var options = {
		onSuccess: onConnect, // after connected, subscribes
		onFailure: onFail     // useful for logging / debugging
	};


	// connect the client
	client.connect(options);
	console.info('Connecting...');
}


function onConnect(context) {
	console.log("Client Connected");
    // And subscribe to our topics	-- both with the same callback function
	options = {qos:2, onSuccess:function(context)
				{ console.log("subscribed"); } 
			   }

	client.subscribe(get_data,options); //get_data = "srdl/info-test/"; topic to subcribe
	
}

function onFail(context) {
	console.log("Failed to connect");
}

function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("Connection Lost: " + responseObject.errorMessage);
		window.alert("Someone else took my websocket!\nRefresh to take it back.");
	}
}



// Handling incoming message

function onMessageArrived(message) {
	console.log(message.destinationName, message.payloadString);
	console.log(message.payloadString);

	if (message.destinationName == get_data)
	{ 
		
		var text = message.payloadString;
		console.log("Text " + text)
		var obj = JSON.parse(text) // str to JSON obj
		console.log(obj.device_data) //obj.key to get the value

		// Catch the html element
		var get_html_element = document.getElementById("Data"); //<h3 id="Data">Data:</h3> from index.html
		// place the received data inside html element
		get_html_element.innerHTML = "Data: " + obj.device_data;
			
  		
  		}

  		
  	}
	

  		