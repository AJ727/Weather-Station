const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};