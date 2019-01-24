// NODE.JS AND EXPRESS.JS
const path = require('path');
const express = require('express');
const sql = require('mssql');

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

// If the heroku env variable exists, use it, if not, use 3000
const port = process.env.PORT || 3000;
// Create an instance of express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const publicPath = path.join(__dirname, '..', 'public');

// This serves up all assets from the public folder
app.use(express.static(publicPath));

// -----------DB Config----------//

const dbConfig = {
    user: "weather",
    password: "We@ther304",
    server: "54.174.128.184\EC2AMAZ-JRSH35R\SQLEXPRESS,4600",
    database: "weatherDB"
};

const connection = new Connection(dbConfig);

// define the query
let execute = () => {
    request = new Request("INSERT Readings VALUES (ExtTemp, Humidity, Pressure)", (err) => {
        if(err){
            console.log(err);
        }
    });
    request.addParameter('ExtTemp', TYPES.Float);
    request.addParameter('Humidity', TYPES.Float);
    request.addParameter('Pressure', TYPES.Float);
    
};

// -------------API------------ //

// POST request handler (arduino data is sent here)
// Sends validated and formatted data to database
app.post('/api/POST', (req, res) => {
    connection.on('connect', (err) => {
        if(err) {
            console.log(err);
        }
        else {
            execute();
        }
    })
    res.send(req.body.Hum);
    //res.json({ message: 'POST response from the Express Server' });
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








// Middleware: will validate and format data
// app.use((req, res, next) => {
//     if(!(isNaN(parseFloat(req.body.Temp)) && isNaN(parseFloat(req.body.Hum)) && isNaN(parseFloat(req.body.Baro)))) {
//         // if any are not a number, send a 500 error
//         console.log(req.body.Temp);
//         res.status(500).send({error: 'invalid data'});
//     }
//     next() // ensures we don't stop here
// });