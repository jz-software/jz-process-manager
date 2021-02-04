const current_url = new URL(location.href);
const server_url = `ws://${current_url.hostname}:${websocket_port}`;

const socket = new WebSocket(server_url, 'echo-protocol');

socket.addEventListener('open', function (event) {
    
});

socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    const app = document.getElementById(data.application_id);
    const memory_usage = app.getElementsByClassName('memory-usage')[0];
    const cpu_usage = app.getElementsByClassName('cpu-usage')[0];

    memory_usage.textContent = `${data.properties.ram_usage}MiB`;
    cpu_usage.textContent = `${data.properties.cpu_usage}%`;
});