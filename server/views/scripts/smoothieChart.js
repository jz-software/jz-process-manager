var smoothie = new SmoothieChart({
    grid: { strokeStyle:'rgb(125, 0, 0)', fillStyle:'rgb(60, 0, 0)',
            lineWidth: 1, millisPerLine: 250, verticalSections: 6, },
    labels: { fillStyle:'rgb(255, 255, 255)' }
});
smoothie.streamTo(document.getElementById("usage-chart"), 1000);

// Data
var line1 = new TimeSeries();
var line2 = new TimeSeries();

// Add to SmoothieChart
smoothie.addTimeSeries(line1, { strokeStyle:'rgb(2, 194, 2)', fillStyle:'rgba(2, 194, 2, 0.3)', lineWidth:3 });
smoothie.addTimeSeries(line2, { strokeStyle:'rgb(247, 161, 3)', fillStyle:'rgba(247, 161, 3, 0.3)', lineWidth:3 });