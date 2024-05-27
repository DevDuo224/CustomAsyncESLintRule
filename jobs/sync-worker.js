const { Worker } = require('worker_threads');  // Import the 'Worker' class from the 'worker_threads' module
const path = require('path');  // Import the 'path' module to work with file paths

// Function to create a synchronous function from a worker script

function createSyncFn(workerPath) {
    return function syncFn(task) {

        const worker = new Worker(workerPath)  // Create a new worker using the provided worker script path

        worker.postMessage(task);  // Send the task to the worker

        let data; // Variable to store the result
        let result; // Variable to store the final result

        const promise = new Promise((resolve, reject) => {

            // Listen for messages from the worker
            worker.on('message', (message) => {
                if (message.error) {
                    reject(new Error(message.error)); // If there is an error, reject the promise with an error
                }
                else {
                    data = message.result;  // Store the result data
                    resolve(message.data);  // Resolve the promise with the result
                }
                worker.terminate();  // Terminate the worker
            });

            // Listen for errors from the worker
            worker.on('error', (error) => {
                reject(error); // Reject the promise with the error
                worker.terminate();  // Terminate the worker
            });

             // Listen for the worker's exit event
             worker.on('exit', (code) => {
                 // Reject the promise if the worker exits with a non-zero code
                 if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
             });

        });

        // Use 'deasync' to block the main thread until the promise resolves
        require('deasync').loopWhile(() => {
            return !data;  // Keep looping while data is not set
        });

        result = data; // Set the result to the data
        return result; // Return the result

    };
}

const syncFn = createSyncFn(path.resolve(__dirname, './worker.js')); // Create the synchronous function using the worker script
module.exports = syncFn; // Export the synchronous function for use in other parts of the application