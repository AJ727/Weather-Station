import React from 'react';
import TempChart from './TempChart';
import HumidChart from './HumidChart';
import PressChart from './PressChart';
import WindSpdChart from './WindSpdChart';
import WindDirChart from './WindDirChart';

// This components purpose is to be imported by actual
// components such as Humidity, Pressure, etc
// and pass in the data specific to each type

class GenericChart extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        weatherData: []
    };
    // call loadData every minute
    componentDidMount = () => {
        this.loadData();
        setInterval(this.loadData, 60000);
    }
    createArray = () => {
        console.log("CREATEARRAY LOG: ");
        console.log(this.state.weatherData);
    }
    loadData = () => { 
        // GET from the local api endpoint
        fetch('/api')
        .then(res => res.json())  // convert to json
        .then(                    // change the local state
            (result) => {
                console.log("FROM LOAD DATA: --- ")
                console.log(result);
                this.setState(() => ({
                    isLoaded: true,
                    weatherData: result.Readings
            }))
        },
            (error) => {
                this.setState(() => ({
                    isLoaded: true,
                    error
                }))
            });
    }
    render(){
            return (
                <div className="wrapper">
                    {/* If there's an error, print it */}
                    {this.state.error && <div>Error: {error.message}</div>}
                    
                    {/* If the state isn't loaded, print loading */}
                    {!(this.state.isLoaded) && <div>Loading...</div>}
                    
                    {/* If the state is loaded and there's no error, proceed. */}
                    {this.state.isLoaded && !(this.state.error) &&
                        <div>
                            <div className="readings">
                                <h1>READINGS</h1>
                                {this.state.weatherData.map(item => (
                                    <ul key={item.time_stamp}>
                                        <li>{"Date: " + item.time_stamp}</li>
                                        <li>{"Temperature: " + item.ExtTemp}</li> 
                                        <li>{"Humidity: " + item.Humidity}</li> 
                                        <li>{"Pressure: " + item.Pressure}</li> 
                                        <li>{"Wind Direction: " + item.WindDir}</li>
                                        <li>{"Wind Speed: " + item.WindSpd}</li>
                                    </ul>
                                ))}
                            </div>

                            <div>
                                <div className="gen_charts" >
                                    <TempChart weatherData={this.state.weatherData} />
                                    <HumidChart weatherData={this.state.weatherData} />
                                </div>

                                <div className="gen_charts">
                                    <PressChart weatherData={this.state.weatherData} />         
                                    <WindSpdChart weatherData={this.state.weatherData} />
                                    <WindDirChart weatherData={this.state.weatherData} />
                                </div>
                            </div>
                        </div>
                    }

                </div>
                
            )
        }
}


export default GenericChart;