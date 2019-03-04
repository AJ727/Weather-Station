const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const express = require('express');
const Connection = require('tedious').Connection; // tedious module for communication with SQL Server
const Request = require('tedious').Request;

// dotenv allows us to hide confidential data in environment variables
require('dotenv').config( { path: '.env' } );

module.exports = () => {
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: ['babel-polyfill', './src/app.js'],
        output: {
            path: path.join(__dirname, '/public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.DATABASE_USERNAME': JSON.stringify(process.env.DATABASE_USERNAME),
                'process.env.DATABASE_PASSWORD': JSON.stringify(process.env.DATABASE_PASSWORD),
                'process.env.DATABASE_SERVER': JSON.stringify(process.env.DATABASE_SERVER),
                'process.env.DATABASE': JSON.stringify(process.env.DATABASE)
            })
        ],
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/',     
            setup: (app) => {
                app.use(express.urlencoded({ extended: true }));
                app.use(express.json());
                const dbConfig = {
                    userName: process.env.DATABASE_USERNAME,
                    password: process.env.DATABASE_PASSWORD,
                    server: process.env.DATABASE_SERVER,
                    database: process.env.DATABASE
                };
                
                // Query that retrieves top X results from SQL Server
                const numberOfResults = "200";
                // TOP(${numberOfResults})
                const retrieveReadings = `USE weatherDB; SELECT TOP(${numberOfResults}) \
                time_stamp, \
                CONVERT(DECIMAL(10,2), ExtTemp) AS ExtTemp, \
                CONVERT(DECIMAL(10,2), Humidity) AS Humidity, \
                CONVERT(DECIMAL(10,2), Pressure) AS Pressure, \
                WindDir, \
                CONVERT(DECIMAL(10,2), WindSpd) AS WindSpd \
                FROM Readings ORDER BY time_stamp DESC \
                FOR JSON PATH;`;
                
                app.post('*', (req, res) => {
                    res.send("Dev Server - no POST functionality");
                });
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
                });    
            }
        }
    }
};
