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
        dates: [],
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
    // creates arrays of same-typed values
    arrayProcessing = () => { 
        let dateArr = [];
        let tempArr = [];
        let humArr = [];
        let pressArr = [];
        let spdArr = [];
        let dirArr = [];
        // for every object in the weatherData array, 
        // create a new array of each reading
        this.state.weatherData.map(readObj => {
            dateArr.push(readObj.time_stamp);
            tempArr.push(readObj.ExtTemp);
            humArr.push(readObj.Humidity);
            pressArr.push(readObj.Pressure);
            spdArr.push(readObj.WindSpd);
            dirArr.push(readObj.WindDir);
        });
        // set the state to the new arrays
        this.setState({
            dates: dateArr,
            temps: tempArr,
            humidities: humArr,
            pressures: pressArr,
            wspeeds: spdArr,
            wdirs: dirArr
        });
    }
    createArray = (desiredReading) => {
        // END FORMAT: [ { x: DATE, y: READING }, { x: DATE2, y: READING2 } ] 
        // FOR WINDDIR: [ { x: "N", y: numOfNreadings }, { x: "NE", y: numofNEreadings } ]
        let weatherArray = [];
            if (desiredReading.toString() === this.state.wdirs.toString()) {
                weatherArray = this.windDirProcesser(desiredReading);
            }
            else {
                for (let i = 0; i < desiredReading.length; i++) {
                    let dataString = JSON.parse(`{ "x": ${i + 1}, "y": ${desiredReading[i]} }`);
                    weatherArray.push(dataString);
                }
            }
            
            return weatherArray;
    }
    windDirProcesser = () => {
        let enumeratedDirArr = []
        let N = 0, NE = 0, E = 0, SE = 0, S = 0, SW = 0, W = 0, NW = 0;
        this.state.wdirs.map(direction => {
            switch(direction) {
                case "N":
                    N++;
                    break;
                case "NE":
                    NE++;
                    break;
                case "E":
                    E++;
                    break;
                case "SE":
                    SE++;
                    break;
                case "S":
                    S++;
                    break;
                case "SW":
                    SW++;
                    break;
                case "W":
                    W++;
                    break;
                case "NW":
                    NW++;
                    break;
                default:
                    N++;
                    break;
            }
        });

        let nDir = JSON.parse(`{ "x": "N", "y": ${N} }`);
        let neDir = JSON.parse(`{ "x": "NE", "y": ${NE} }`);
        let eDir = JSON.parse(`{ "x": "E", "y": ${E} }`);
        let seDir = JSON.parse(`{ "x": "SE", "y": ${SE} }`);
        let sDir = JSON.parse(`{ "x": "S", "y": ${S} }`);
        let swDir = JSON.parse(`{ "x": "SW", "y": ${SW} }`);
        let wDir = JSON.parse(`{ "x": "W", "y": ${W} }`);
        let nwDir = JSON.parse(`{ "x": "NW", "y": ${NW} }`);
        enumeratedDirArr.push(nDir, neDir, eDir, seDir, sDir, swDir, wDir, nwDir);

        return enumeratedDirArr;
    }
    loadData = () => { 
        // GET request to local api endpoint
        fetch('/api')
        .then(res => res.json())  // convert to json
        .then(                    // change the local state
            (result) => {
                console.log("FROM LOAD DATA: ")
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
                            <div>
                                <div className="gen_charts" >
                                    <TempChart tempData={this.createArray(this.state.temps)} />
                                    <HumidChart humidData={this.createArray(this.state.humidities)} />
                                </div>

                                <div className="gen_charts">
                                    <PressChart pressData={this.createArray(this.state.pressures)} />         
                                    <WindSpdChart spdData={this.createArray(this.state.wspeeds)} />
                                    <WindDirChart dirData={this.createArray(this.state.wdirs)} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            )
        }
            
}

export default Chart;