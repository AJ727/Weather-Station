import React from 'react';
import TempChart from './TempChart';
import HumidChart from './HumidChart';
import PressChart from './PressChart';
import WindDirChart from './WindDirChart';

// This components purpose is to be imported by actual
// components such as Humidity, Pressure, etc
// and pass in the data specific to each type

class GenericChart extends React.Component {
    constructor(props) { // pass in properties upon being instantiated
        super(props);    // pass the properties upwards
        this.state = {
            error: null,
            isLoaded: false,
            weatherData: []
        };
        // arrow functions usually solve the "this" binding problem,
        // but in this instance it must be manually bound
        this.loadData = this.loadData.bind(this); 
    }
    // call loadData every minute
    componentDidMount() {
        this.loadData();
        setInterval(this.loadData, 60000);
    }
    loadData() { 
        // GET from the local api endpoint
        fetch('/api/all')
        .then(res => res.json())  // convert to json
        .then(                    // change the local state
            (result) => {
                this.setState({
                    isLoaded: true,
                    weatherData: result.Readings
            });
        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            });
    }
    render(){
            const {error, weatherData, isLoaded} = this.state;
            if(error){
                return <div>Error: {error.message}</div>
            }
            else if (!isLoaded) {
                return <div>Loading...</div>
            }
            else {
                return (
                    <div className="wrapper">
                        {console.log("genchart1: " + weatherData)}
                        <div className="readings">
                            <h1>READINGS</h1>
                            {weatherData.map(item => (
                                <ul key={item.time_stamp}>
                                    <li>{"Date: " + item.time_stamp}</li>
                                    <li>{"Temperature: " + item.ExtTemp}</li> 
                                    <li>{"Humidity: " + item.Humidity}</li> 
                                    <li>{"Pressure: " + item.Pressure}</li> 
                                    <li>{"Wind Direction: " + item.WindDir}</li>
                                </ul>
                            ))}
                        </div>

                        <div>
                            <div className="gen_charts" >
                                <TempChart weatherData={weatherData} />
                                <HumidChart weatherData={weatherData} />
                            </div>

                            <div className="gen_charts">
                                <PressChart weatherData={weatherData} />         
                                <WindDirChart weatherData={weatherData} />
                            </div>
                        </div>
                    
                    </div>
                )
            }
    }
}

export default GenericChart;