// EXPRESSJS (Nodejs framework)
const path = require('path');
const express = require('express');

// tedious module
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

// --------------DB Config-------------//

// TODO: Is it possible to use a variable, instead of
// staticly typing in the server IP?
const dbConfig = {
    userName: 'weather',
    password: 'We@ther304',
    server: '3.86.58.142',
    database: 'weatherDB'
};


// ----------------API---------------- //

// POST request handler (arduino data is sent here)
// Sends validated and formatted data to database
app.post('/api/POST', (req, res) => {
    let connection = new Connection(dbConfig);
    // upon successful connection, execute if-else block
    connection.on('connect', (err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('CONNECTED');
            execSendToDb(req, connection);
            console.log('WRITTEN TO DB');
        }
    })
    
    res.send(req.body);
});

// app.get('/api/retrieve-data', (req, res) => {
//     console.log(req.query);
//     const baseURL = "";
// });

// Creates SQL query that sends data to SQL Server
let execSendToDb = (req, connection) => {
    // let date_time = new Date().toLocaleString('en-us', {
    //     timeZone: 'America/New_York'
    // });
    let date_time = new Date();
    let date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
    let time = (today.getHours() - 5) + ":" + today.getMinutes() + ":" + today.getSeconds();
    let date_time = date + ' ' + time;
    console.log(date_time);
    request = new Request("USE weatherDB; INSERT Readings (time_stamp, ExtTemp, Humidity, Pressure, WindDir) VALUES (@time_stamp, @ExtTemp, @Humidity, @Pressure, @WindDir);", (err) => {
        if(err){
            console.log(err);
        }
    });
    // @params - 1st is what variable is being replaced
    // @params - 2nd is the data type of the variable
    // @params - 3rd is the value to be passed in 
    request.addParameter('time_stamp', TYPES.DateTime, date_time);
    request.addParameter('ExtTemp', TYPES.Float, req.body.Temp);
    request.addParameter('Humidity', TYPES.Float, req.body.Hum);
    request.addParameter('Pressure', TYPES.Float, req.body.Press);
    request.addParameter('WindDir', TYPES.VarChar, req.body.WindDir);
    console.log(request);
    connection.execSql(request);
};

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