// NodeJS with Express
const path = require('path');
const express = require('express');
const Connection = require('tedious').Connection; // tedious module for communication with SQL Server
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

// --------------DB Config------------- //
const dbConfig = {
    userName: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_SERVER,
    database: process.env.DATABASE

};

// Query that retrieves top X results from SQL Server
const numberOfResults = "2016";
//TOP(${numberOfResults})
const retrieveReadings = `USE weatherDB; SELECT TOP(${numberOfResults}) \
time_stamp, \
CONVERT(DECIMAL(10,2), ExtTemp) AS ExtTemp, \
CONVERT(DECIMAL(10,2), Humidity) AS Humidity, \
CONVERT(DECIMAL(10,2), Pressure) AS Pressure, \
WindDir, \
CONVERT(DECIMAL(10,2), WindSpd) AS WindSpd \
FROM Readings ORDER BY time_stamp DESC \
FOR JSON PATH;`;

// ----------------API---------------- //

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
});

// Creates SQL query that sends data to SQL Server
let execSendToDb = (req, connection) => {
    request = new Request("USE weatherDB; INSERT Readings (time_stamp, ExtTemp, Humidity, Pressure, WindDir, WindSpd) VALUES (GETDATE(), @ExtTemp, @Humidity, @Pressure, @WindDir, @WindSpd);", (err) => {
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
    request.addParameter('WindSpd', TYPES.Float, req.body.WindSpd);
    connection.execSql(request);

}; // --- End Post --- //

app.get('/api', (req, res) => {
    let connection = new Connection(dbConfig);
    connection.on('connect', (err) => {
        if(err){
            console.log(err);
        }
        else {
            request = new Request(retrieveReadings, (err, rowCount) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log('Query successful with ' +  rowCount + ' rows returned');
                }
            }); 

            // For every column returned in columns, add it's value to a string
            let data = '';
            request.on('row', (columns) => {
                columns.forEach((column) => data += column.value);
            });

            // If we don't check if the dataset is empty, JSON parse errors will be thrown when trying to parse nothing
            request.on('done', () => {
                if(data === null || data === ''){
                    console.log("Loading data...");
                }
                else {
                    res.json(JSON.parse(data));
                }
            });

            connection.execSqlBatch(request);
        }

    })

    connection.on('end', (err) => {
        if(err){
            console.log(err);
        }
        else {
            connection.close();
            console.log("---Connection Closed---");
        }
    });

}); // --- End DB Get --- //

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