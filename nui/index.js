window.addEventListener('message', (event) => {
    let data = event.data;
    if (data.type === 'StartProgressBar') {
        let progBar = document.getElementById('progbar');
        progBar.style.display = 'block';

        // Calculate the number of steps for the progress bar based on the time
        let totalTime = parseInt(data.length);
        let interval = 10; // Update the progress every 10 milliseconds (adjust as needed)
        let steps = totalTime / interval;

        let currentStep = 0;

        // Update progress at regular intervals
        let progressInterval = setInterval(() => {
            if (currentStep >= steps) {
                // Stop the progress bar when the specified time has elapsed
                clearInterval(progressInterval);
                progBar.style.display = 'none';
            } else {
                progBar.value = (currentStep / steps) * 100;
                currentStep++;
            }
        }, interval);
    } else if (data.type === 'ConfigureProgressBar') {
        let configBar = document.getElementById('configure');
        configBar.style.display = 'block';
    } else if (data.type === 'SetProgressBar') {
        document.getElementById('prog-preview').textContent = data.text;
        document.getElementById('prog-preview').style.backgroundColor =
            data.color;
    }
});
showContent(document.querySelector('.progs.active')); // initial active

function showContent(clickedDiv) {
    const progs = document.querySelectorAll('.progs');
    const preview = document.getElementById('prog-preview');

    progs.forEach((div) => div.classList.remove('active'));
    const clickedText = clickedDiv.textContent;

    preview.textContent = clickedText;
    preview.style.display = 'block';

    clickedDiv.classList.add('active');
}

function setColor(event) {
    const bgColor = event.target.style.backgroundColor;
    document.getElementById('prog-preview').style.backgroundColor = bgColor;
}

function changeColor() {
    document.getElementById('prog-preview').style.backgroundColor =
        document.getElementById('create-color').value;
}

function apply() {
    const selectedData = {
        selectedText: document.getElementById('prog-preview').textContent,
        selectedColor:
            document.getElementById('prog-preview').style.backgroundColor,
    };
    localStorage.setItem('selectedData', JSON.stringify(selectedData));
    axios.post(`https://${GetParentResourceName()}/StoreConfigData`, {
        selectedData: selectedData,
    });
}

function Cancel() {
    //hide UI from front end
    let editProgDiv = document.getElementById('configure');
    editProgDiv.style.display = 'none';

    axios.post(`https://${GetParentResourceName()}/StoreConfigData`)
        .then(response => {
            console.log('POST request successful', response);
        })
        .catch(error => {
            console.error('Error during POST request', error);
        });
}
