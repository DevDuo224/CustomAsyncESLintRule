import globals from "globals";
// import pluginJs from "@eslint/js";
import plugin from "./index.js"; // Import the custom plugin from the specified path



export default [
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  {
    plugins : {
      pluginEndpoint : plugin // Register the custom plugin under the name "pluginEndpoint"
    },
    rules : {
      "pluginEndpoint/end-point-rule": "error" // Enable the custom rule with an "error" severity
    }
  }
  // pluginJs.configs.recommended,  // (Optional) Include ESLint's recommended JavaScript rules
];