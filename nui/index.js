window.addEventListener('message', (event) => {
    let data = event.data;
    if (data.type === 'StartProgressBar') {
        var progBar = document.getElementById('progbar');
        progBar.style.display = 'block';

        // Calculate the number of steps for the progress bar based on the time
        var totalTime = parseInt(data.length);
        var interval = 10; // Update the progress every 10 milliseconds (adjust as needed)
        var steps = totalTime / interval;

        var currentStep = 0;

        // Update progress at regular intervals
        var progressInterval = setInterval(() => {
            if (currentStep >= steps) {
                // Stop the progress bar when the specified time has elapsed
                clearInterval(progressInterval);
                progBar.style.display = 'none';
            } else {
                progBar.value = (currentStep / steps) * 100;
                currentStep++;
            }
        }, interval);
    }
});
