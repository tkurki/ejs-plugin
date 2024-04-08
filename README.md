# Ejs template plugin for Signal K Server

Plugin to render [ejs](https://www.npmjs.com/package/ejs) templates with access to Signal K data.

Simply place index.html in the plugin's data directory (see plugin configuration for the exact path).
They will be rendered as ejs templates.

Signal K values can be accessed with expressions like `<%=v('environment.wind.directionTrue',{c:['rad','deg'], dec: 0})%>` where `c` specifies unit conversion using [js-quantities](https://www.npmjs.com/package/js-quantities) and `dec` specifies the number of decimal places to use.

You can also place static resources like css and image files in the directory.

# NOTE About Security

EJS is effectively a JavaScript runtime. Its entire job is to execute JavaScript. If you run the EJS render method without checking the inputs yourself, you are responsible for the results. Do not use any user modifiable input (like http request parameters) in your template without careful validation.