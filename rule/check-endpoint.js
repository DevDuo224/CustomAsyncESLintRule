const syncFn = require('../jobs/sync-worker');  // Import the synchronous function created using the worker

const BASE_URL = 'http://localhost:3000/data'; // mock data base url for making thr requests to check the endpoint registration

module.exports = {
    // Define the create function which returns an object with ESLint rule listeners
    create(context) {
        // Listener for CallExpression nodes in the AST

        return {
            CallExpression(node) {
                if (node.callee.type === 'Identifier' && node.callee.name === 'fetch') { // Check if the call expression is a fetch call
                    // Get the endpoint URL argument from the fetch call
                    const endpoint = node.arguments[0]?.value;

                    // Construct the request URL to check the endpoint registration
                    const requestURL = `${BASE_URL}?url=${encodeURIComponent(endpoint)}`;

                    try {

                        // Call the synchronous function to check the endpoint registration
                        const data = syncFn({ requestURL });
                        if (data[0]) {// Check if there is data returned
                            if (!data[0].registered) { // Check if the endpoint is not registered
                                // Report an ESLint error if the endpoint is not registered
                                context.report({
                                    node,
                                    message: `This endpoint (${endpoint}) is not registered.`,
                                });
                            }
                        }

                        else{ // Report an ESLint error if no data is returned
                            context.report({
                                node,
                                message: `This endpoint (${endpoint}) is not registered.`,
                            });
                        }

                    } catch (error) {
                        // Report an ESLint error if there is an error during the check
                        context.report({ 
                            node,
                            message: `Error checking endpoint registration: ${error.message}`,
                        });
                    }
                }
            }
        }
    }
}
