const app = require("./app");

const env = process.env.NODE_ENV || 'development';

const port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log('Server running on port %d', port,env);
});