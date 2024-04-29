const jsonData = { key: [2595, 1, 0, 0, 5, 0, 1, 0, 12, 5, 2, 0, 1, 7, 0, 1, 0] };
const arr = document.getElementById('arr');
const output = document.getElementById('Output');
arr.innerText = arr.innerText + '[' + jsonData.key +']';
async function postData() {
    try {
        const response = await fetch('http://localhost:8000/receive_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        // Check if the fetch operation was successful (status code 200)
        if (response.ok) {
            const data = await response.json(); // Parse response as JSON
            console.log(data); // Log the parsed JSON response

            // Extract the prediction value from the response
            const predictionValue = data.Prediction.replace('$[', '').replace(']', '');
            const predictionNumber = parseInt(predictionValue);

            // Display the extracted prediction number in the 'output' element
            output.innerText = `Prediction: ${predictionNumber}`;
        } else {
            console.error('HTTP error:', response.status);
            output.innerText = 'Error: Failed to fetch data';
        }
    } catch (error) {
        console.error('Error:', error);
        output.innerText = 'Error: ' + error.message;
    }
}
postData()