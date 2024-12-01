function uploadData() {
    const fileInput = document.getElementById('dataFile');
    if (!fileInput.files.length) {
        alert("Please select a file to upload.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = e.target.result;
        console.log("Data uploaded: ", data);
        // Parse CSV and send to backend for processing.
    };

    reader.readAsText(file);
}

function predictTheft() {
    fetch('/predict-theft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ /* Add necessary data */ })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('results').innerText = `Prediction: ${data.message}`;
        })
        .catch(error => console.error('Error:', error));
}



