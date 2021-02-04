const application_title = document.getElementById('application-title');
const status_info = document.getElementById('status');
const cpu_usage = document.getElementById('cpu-usage');
const memory_usage = document.getElementById('memory-usage');
const uptime = document.getElementById('uptime');

const current_url = new URL(location.href);
const server_url = `ws://${current_url.hostname}:${websocket_port}`;

const socket = new WebSocket(server_url, 'echo-protocol');

socket.addEventListener('open', function (event) {
    
});

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    
    const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minutes") : "";
    return dDisplay + hDisplay + mDisplay;
}

socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    if(data.application_id == application_title.getAttribute('application-id')){
        const { properties } = JSON.parse(event.data);

        status_info.textContent = properties.status ? 'active' : 'deactivated';
        cpu_usage.textContent = `${properties.cpu_usage}%`;
        memory_usage.textContent = `${properties.ram_usage}MiB`;
        uptime.textContent = `${secondsToDhms(properties.uptime)}`;

        line1.append(new Date().getTime(), properties.ram_usage);
        line2.append(new Date().getTime(), properties.cpu_usage);
    }
});