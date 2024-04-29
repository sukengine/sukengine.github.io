function initializeMQTT() {
    // Note: Separate client ID from path and ensure it's used correctly
    const client = new Paho.MQTT.Client("broker.hivemq.com", 8000);
  
    // Set callback handlers for the client
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
  
    // Connect the client with configuration options
    client.connect({
      onSuccess: onConnect,
      onFailure: onFailure,
      useSSL: false // Change to true if using wss (secure connection) and correct port
    });
  
    // Function called when the client successfully connects
    function onConnect() {
      console.log("Connected to MQTT broker");
      client.subscribe("taist/aiot/junctionkanshi/camera1/status");
    }
  
    // Function called if the client fails to connect
    function onFailure(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.error("Failed to connect: " + responseObject.errorMessage);
      }
    }
  
    // Function called when the connection is lost
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.error("Connection lost: " + responseObject.errorMessage);
      }
    }
  
    // Function called when a message arrives
    function onMessageArrived(message) {
      console.log("Message Arrived: " + message.payloadString);
      const data = JSON.parse(message.payloadString);
      if (document.getElementById("status") && document.getElementById("datetime")) {
        document.getElementById("status").innerHTML = "Traffic Status: " + data.traffic_status;
        console.log(data.traffic_status);
        document.getElementById("datetime").innerHTML = "Last Update: " + data.datetime;
        console.log(data.datetime);
      } else {
        console.error("HTML elements for displaying data not found.");
      }
    }
}