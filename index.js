const axios = require('axios');
const { getCpuUsage, memoryUsage } = require('./helpers/os');

class ProcessManager{
    constructor(server_url, application_id, auth_key, refreshRate){
        const interval = setInterval(async function() {
            const cpuUsage = await getCpuUsage();
            axios.post(`${server_url}/application/edit/`, null, { params: {
                application_id,
                auth_key,
                status: true,
                cpu_usage: cpuUsage.toFixed(2),
                ram_usage: memoryUsage().toFixed(2),
            }})
        }, refreshRate);
    }
}

module.exports = ProcessManager;