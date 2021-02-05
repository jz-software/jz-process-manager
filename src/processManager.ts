import { client, connection } from 'websocket'
import { getCpuUsage, memoryUsage } from './helpers/os';

export class ProcessManager{
    client: client;
    connection = false;
    constructor(server_url: string, application_id: string, auth_key: string, refreshRate: number){
        this.client = new client;
        this.client.on('connectFailed', function(error: Error) {
            console.log('Connect Error: ' + error.toString());
        });
        this.client.on('connect', (connection: connection) => {
            this.connection = true;
            console.log('WebSocket Client Connected');
            connection.on('error', (error: Error) => {
                this.connection = false;
                console.log("Connection Error: " + error.toString());
            });
            connection.on('close', () => {
                this.connection = false;
                console.log('echo-protocol Connection Closed');
            });
            setInterval(async () => {
                if (connection.connected) {
                    const info = {
                        application_id,
                        auth_key,
                        status: true,
                        cpu_usage: (await getCpuUsage()).toFixed(2),
                        ram_usage: memoryUsage().toFixed(2),
                        uptime: process.uptime().toFixed(0)
                    }
                    connection.sendUTF(JSON.stringify(info));
                }
            }, refreshRate)
        });
        this.client.connect(server_url, 'echo-protocol');

        // check if connection is true
        setInterval(() => {
            if(!this.connection){
                this.client.connect(server_url, 'echo-protocol');
            }
        }, 10000)
    }
}