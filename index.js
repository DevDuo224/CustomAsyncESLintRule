const endPointRule = require("./rule/check-endpoint"); // Import the custom rule from the specified path

const plugin = {
    // Define the rules object for the plugin
    rules: {
        "end-point-rule": endPointRule // Register the custom rule under the name "end-point-rule"
    }

};

module.exports = plugin; // Export the plugin object for use in an ESLint configuration