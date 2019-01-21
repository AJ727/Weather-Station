// NODE.JS AND EXPRESS.JS
// require is equivalent to import
const path = require('path');
const express = require('express');
const bodyParse = require('body-parser');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
// If the heroku env variable exists, use it, if not, use 3000
const port = process.env.PORT || 3000;

// Take the return value (a function) and pass it into app.use
// This serves up all assets from the public folder
app.use(express.static(publicPath));

// ---API--- //
// GET request handler (nothing to do with the arduino)
//app.get('/api/getRequest', (req, res) => {
//});

console.log("server log");
// POST request handler (arduino data is sent here)
// When data is received, validate, parse, and pass to database
app.post('/api/postRequest', (req, res) => {
    // var query = "";
    // executeQuery();
    console.log("POST REQUEST RECEIVED");
});

// First arg: path (the * matches all unmatched routes)
// Second arg: function that handles the unmatched requests
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// First arg: port number
// Second arg: callback function
app.listen(port, () => {
    console.log('server is up at port: ' + port);
});