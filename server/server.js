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

const dbConfig = {
    userName: 'weather',
    password: 'We@ther304',
    server: '3.86.58.142',
    database: 'weatherDB'
};

// ----------------API---------------- //
app.get('/api/all', (req, res) => {
    let connection = new Connection(dbConfig);
    connection.on('connect', (err) => {
        if(err){
            console.log(err);
        }
        else {
            request = new Request("USE weatherDB; SELECT TOP(5) \
            time_stamp, \
            CONVERT(DECIMAL(10,2), ExtTemp) AS ExtTemp, \
            CONVERT(DECIMAL(10,2), Humidity) AS Humidity, \
            CONVERT(DECIMAL(10,2), Pressure) AS Pressure, \
            WindDir \
            FROM Readings ORDER BY time_stamp DESC \
            FOR JSON PATH, ROOT('Readings');"
            , (err, rowCount) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(rowCount + ' rows');
                }
            }); 

            let data = '';
            request.on('row', (columns) => {
                columns.forEach((column) => data += column.value);
                res.json(JSON.parse(data));
            });
            connection.execSql(request);
        }
    })
});


app.get('/api', (req, res) => {
    let connection = new Connection(dbConfig);
    connection.on('connect', (err) => {
        if(err){
            console.log(err);
        }
        else {
            request = new Request("USE weatherDB; SELECT TOP(1) \
            time_stamp, \
            CONVERT(DECIMAL(10,2), ExtTemp) AS ExtTemp, \
            CONVERT(DECIMAL(10,2), Humidity) AS Humidity, \
            CONVERT(DECIMAL(10,2), Pressure) AS Pressure, \
            WindDir \
            FROM Readings ORDER BY time_stamp DESC \
            FOR JSON PATH, ROOT('Readings');"
            , (err, rowCount) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(rowCount + ' rows');
                }
            }); 

            let data = '';
            request.on('row', (columns) => {
                columns.forEach((column) => data += column.value);
                res.json(JSON.parse(data));
            });
            connection.execSql(request);
        }
    })
});

// POST request handler (arduino data is sent here)
// Sends validated and formatted data to SQL Server AWS Instance
app.post('/api', (req, res) => {
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
    res.json(req.body);
});

// Creates SQL query that sends data to SQL Server
let execSendToDb = (req, connection) => {
    request = new Request("USE weatherDB; INSERT Readings (time_stamp, ExtTemp, Humidity, Pressure, WindDir) VALUES (GETDATE(), @ExtTemp, @Humidity, @Pressure, @WindDir);", (err) => {
        if(err){
            console.log(err);
        }
    });
    // @params - 1st is what variable is being replaced
    // @params - 2nd is the data type of the variable
    // @params - 3rd is the value to be passed in 
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

// TODO: Validation -------------------------------------
// Middleware: will validate and format data
// app.use((req, res, next) => {
//     if(!(isNaN(parseFloat(req.body.Temp)) && isNaN(parseFloat(req.body.Hum)) && isNaN(parseFloat(req.body.Baro)))) {
//         // if any are not a number, send a 500 error
//         console.log(req.body.Temp);
//         res.status(500).send({error: 'invalid data'});
//     }
//     next() // ensures we don't stop here
// });