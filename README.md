# Ejs template plugin for Signal K Server

This plugin 
- adds http routes for files under Signal K server's configuration directory in this plugin's data directory (default (default $HOME/.signalk/plugin-config-data/ejs-plugin/)
- processes all requests ending in .html as [ejs](https://www.npmjs.com/package/ejs) templates

Signal K values can be accessed with expressions like `<%=v('environment.wind.directionTrue',{c:['rad','deg'], dec: 0})%>` where `c` specifies unit conversion using [js-quantities](https://www.npmjs.com/package/js-quantities)

# NOTE About Security

EJS is effectively a JavaScript runtime. Its entire job is to execute JavaScript. If you run the EJS render method without checking the inputs yourself, you are responsible for the results. Do not use any user modifiable input (like http request parameters) in your template without careful validation.