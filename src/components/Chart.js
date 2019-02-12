import React from 'react';
import TempChart from './TempChart';
import HumidChart from './HumidChart';
import PressChart from './PressChart';
import WindSpdChart from './WindSpdChart';
import WindDirChart from './WindDirChart';

// This components purpose is to query the API every
// X minutes, and store that data in a local state array
// It then passes in properties to the corresponding child chart
// components, where the data will be displayed

class Chart extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        weatherData: [],
        temps: [],
        humidities: [],
        pressures: [],
        wspeeds: [],
        wdirs: []
    };
    // call loadData every minute
    componentDidMount = () => {
        this.loadData();
        setInterval(this.loadData, 60000);
    }
    arrayProcessing = () => {
        let tempArr = [];
        let humArr = [];
        let pressArr = [];
        let spdArr = [];
        let dirArr = [];
        this.state.weatherData.map(readObj => {
            tempArr.push(readObj.ExtTemp);
            humArr.push(readObj.Humidity);
            pressArr.push(readObj.Pressure);
            spdArr.push(readObj.WindSpd);
            dirArr.push(readObj.WindDir);
        });
        this.setState({
            temps: tempArr,
            humidities: humArr,
            pressures: pressArr,
            wspeeds: spdArr,
            wdirs: dirArr
        });
        console.log("the state boi");
        console.log(this.state);
    }
    createArray = (typeNum) => {
        const weatherArray = [];
            for (let i = 0; i < this.state.weatherData.length; i++) {
                let readingType = eval(this.whichReading(typeNum));
                //console.log(readingType);
                let dataString = JSON.parse('{"x": ' + (i + 1) + ', "y": ' + readingType ? readingType : 0 + '}');
                weatherArray.push(dataString);
            }
            return weatherArray;
    }
    whichReading = (value) => {
        switch(value){
            case 1:
                return "this.state.weatherData[i].ExtTemp";
            case 2:
                return "this.state.weatherData[i].Humidity";
            case 3:
                return "this.state.weatherData[i].Pressure";
            case 4:
                return "this.state.weatherData[i].WindSpd";
        }
    }
    loadData = () => { 
        // GET request to local api endpoint
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
            }) // after data is loaded, process it
        .then(() => this.arrayProcessing());
    }
    render() {
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
                                {/*this.state.weatherData.map(item => (
                                    <ul key={item.time_stamp}>
                                        <li>{"Date: " + item.time_stamp}</li>
                                        <li>{"Temperature: " + item.ExtTemp}</li> 
                                        <li>{"Humidity: " + item.Humidity}</li> 
                                        <li>{"Pressure: " + item.Pressure}</li> 
                                        <li>{"Wind Direction: " + item.WindDir}</li>
                                        <li>{"Wind Speed: " + item.WindSpd}</li>
                                    </ul>
                                ))*/}
                            </div>

                            <div>
                                <div className="gen_charts" >
                                    <TempChart tempData={this.createArray(1)} />
                                    <HumidChart humidData={this.createArray(2)} />
                                </div>

                                <div className="gen_charts">
                                    <PressChart pressData={this.createArray(3)} />         
                                    <WindSpdChart spdData={this.createArray(4)} />
                                    <WindDirChart weatherData={this.state.weatherData} />
                                </div>
                            </div>
                        </div>
                    }

                </div>
                
            )
        }
}

export default Chart;