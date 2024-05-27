const { parentPort } = require('worker_threads'); // Import the 'parentPort' object from the 'worker_threads' module

// Listen for messages from the parent thread

parentPort.on('message', async (task) => {
    
    try {
        const result = await performAsyncTask(task);  // Perform the async task and wait for its result
        parentPort.postMessage({ result }); // Send the result back to the parent thread
    } catch (error) {
        parentPort.postMessage({ error: error.message }); // Send any error messages back to the parent thread
    }

});

// Function to perform the actual async task

async function performAsyncTask(task) {
    const response = await fetch(task.requestURL); // Make an async HTTP request
    const data = await response.json(); // Parse the response as JSON
    return data;  // Return the parsed data
}
