const application_title = document.getElementById('application-title');
const status_info = document.getElementById('status');
const cpu_usage = document.getElementById('cpu-usage');
const memory_usage = document.getElementById('memory-usage');

const current_url = new URL(location.href);
const server_url = `ws://${current_url.hostname}:${websocket_port}`;

const socket = new WebSocket(server_url, 'echo-protocol');

socket.addEventListener('open', function (event) {
    
});

socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    if(data.application_id == application_title.getAttribute('application-id')){
        const { properties } = JSON.parse(event.data);

        status_info.textContent = properties.status ? 'active' : 'deactivated';
        cpu_usage.textContent = `${properties.cpu_usage}%`;
        memory_usage.textContent = `${properties.ram_usage}MiB`;

        line1.append(new Date().getTime(), properties.ram_usage);
        line2.append(new Date().getTime(), properties.cpu_usage);
    }
});