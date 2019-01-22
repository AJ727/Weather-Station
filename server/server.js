// NODE.JS AND EXPRESS.JS
const path = require('path');
const express = require('express');
const sql = require('mssql');

// If the heroku env variable exists, use it, if not, use 3000
const port = process.env.PORT || 3000;
// Create an instance of express
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const publicPath = path.join(__dirname, '..', 'public');
// Take the return value (a function) and pass it into app.use
// This serves up all assets from the public folder
app.use(express.static(publicPath));

// -----------DB Config----------//

const dbConfig = {
    user: "weather",
    password: "We@ther304",
    server: "54.174.128.184\EC2AMAZ-JRSH35R\SQLEXPRESS,4600",
    database: "weatherDB"
};

// define the query
let query = (res, query) => {
    
};

// -------------API------------ //

// Middleware: will validate and format data
app.use((req, res, next) => {
    
    res.send(req.body);
    next(); // ensures we don't stop here
});

// POST request handler (arduino data is sent here)
// Sends validated and formatted data to database
app.post('/api/POST', (req, res) => {
    res.json({ message: 'POST response from the Express Server' });
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