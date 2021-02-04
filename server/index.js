require('dotenv').config();
const express = require('express');
const app = express();
app.set('views', './server/views');
app.set('view engine', 'pug');
const port = 3000;
const db = require('./db');
const fs = require('fs');
const schema = fs.readFileSync(__dirname+'/db/schema.sql', 'utf-8');
db.query(schema);

const websocket_port = 80;

app.get('/dashboard', async (req, res) => {
  const applications = await db.query('SELECT * FROM applications');
  res.render('dashboard', { applications: applications.rows, websocket_port });
})

app.get('/application/view/:application_id', async (req, res) => {
  const applications = await db.query('SELECT * FROM applications WHERE application_id = $1', [req.params.application_id]);
  res.render('view', { application: applications.rows[0], websocket_port });
})

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})

const WebSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port ' + 8080);
});

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    const connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', async function(message) {
        if (message.type === 'utf8') {
            message = JSON.parse(message.utf8Data);

            const { application_id, auth_key } = message;
            delete message.application_id;
            delete message.auth_key;
        
            const keys = Object.keys(message);
            const values = Object.values(message)
            let query = []
            for(let i=0; i<keys.length; i++){
              query.push(`${keys[i]} = ${values[i]}`);
            }
        
            const auth = await db.query('SELECT EXISTS(select 1 from auth_keys WHERE auth_id = $1)', [auth_key]);
            if(!auth.rows[0].exists) throw Error('Authentication key not found');

            connection.sendUTF(JSON.stringify({ status: 200, "message": "updated" }));

            wsServer.connections.forEach((client) => {
              client.sendUTF(JSON.stringify({ application_id: application_id, properties: message }));
            })
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});