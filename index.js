const WebSocketClient = require('websocket').client;
const { getCpuUsage, memoryUsage } = require('./helpers/os');

class ProcessManager{
    constructor(server_url, application_id, auth_key, refreshRate){
        this.client = new WebSocketClient();
        this.client.on('connectFailed', function(error) {
            console.log('Connect Error: ' + error.toString());
        });
        this.client.on('connect', function(connection) {
            console.log('WebSocket Client Connected');
            connection.on('error', function(error) {
                console.log("Connection Error: " + error.toString());
            });
            connection.on('close', function() {
                console.log('echo-protocol Connection Closed');
            });
            connection.on('message', function(message) {
                if (message.type === 'utf8') {
                    const response = JSON.parse(message.utf8Data);
                    if(response.status != 200){
                        // do nothing for now
                        // console.log("Received: '" + message.utf8Data + "'");
                    }
                }
            });
            
            async function sendInfo() {
                if (connection.connected) {
                    const cpuUsage = await getCpuUsage();
                    const info = {
                        application_id,
                        auth_key,
                        status: true,
                        cpu_usage: cpuUsage.toFixed(2),
                        ram_usage: memoryUsage().toFixed(2),
                    }
                    connection.sendUTF(JSON.stringify(info));
                    setTimeout(sendInfo, refreshRate);
                }
            }
            sendInfo();
        });
        this.client.connect(server_url, 'echo-protocol');
    }
}

module.exports = ProcessManager;