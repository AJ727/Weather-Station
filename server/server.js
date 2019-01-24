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
    userName: 'weather',
    password: 'We@ther304',
    server: '3.86.58.142',
    database: 'weatherDB'
};


// ----------MSSQL-----------
// let execQuery = (req, query) => {
//     sql.connect(dbConfig, (err) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             let request = new sql.Request();
//             request.query(query, (err, rs) => {
//                 if(err) {
//                     console.log("Error while querying database: - " + err);
//                     res.send(err);
//                 }
//                 else {
//                     console.log("EXEC RESPONSE: " + res);
//                     res.send(rs);
//                 }
//             });
//         }
//     });
// };




// -------------API------------ //

// POST request handler (arduino data is sent here)
// Sends validated and formatted data to database
app.post('/api/POST', (req, res) => {
    //let query = "INSERT INTO Readings (ExtTemp, Humidity, Pressure) VALUES (req.body.Temp, req.body.Hum, req.body.Press)";
    let connection = new Connection(dbConfig);
    connection.on('connect', (err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('CONNECTED');
            execute(req, connection);
            console.log('Written');
        }
    })
    
    res.send(req.body.Temp);
    //sql.close();
});

let execute = (req, connection) => {
    let date_time = new Date();
    console.log(date_time);
    request = new Request("INSERT INTO Readings (time_stamp, ExtTemp, Humidity, Pressure) VALUES (@time_stamp, @ExtTemp, @Humidity, @Pressure);", (err) => {
        if(err){
            console.log(err);
        }
    });
    request.addParameter('time_stamp', TYPES.DateTime, date_time);
    request.addParameter('ExtTemp', TYPES.Float, req.body.Temp);
    request.addParameter('Humidity', TYPES.Float, req.body.Hum);
    request.addParameter('Pressure', TYPES.Float, req.body.Press);
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