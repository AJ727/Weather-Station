import React from 'react';
import LoadingPage from './LoadingPage';
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
    // SPEC: Lifecycle method that is called once component is inserted as a node into the DOM
    componentDidMount = () => {
        this.loadData();
        // call loadData every minute
        setInterval(this.loadData, 60000);
    }
    // SPEC: Creates arrays of same-typed values using the loaded data (loadData calls this function)
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
            dates: dateArr.reverse(),
            temps: tempArr.reverse(),
            humidities: humArr.reverse(),
            pressures: pressArr.reverse(),
            wspeeds: spdArr.reverse(),
            wdirs: dirArr.reverse()
        });
    }
    // SPEC: Takes state and returns an array of the same type of data (Ex. all Temps, or all Pressures)
    createArray = (desiredReading) => {
        // END FORMAT: [ { x: DATE, y: READING }, { x: DATE2, y: READING2 } ] 
        // FOR WINDDIR: [ { x: "N", y: numOfNreadings }, { x: "NE", y: numofNEreadings } ]
        let weatherArray = [];
            // using Object.is() checks if both objects are the same, which is a massive improvement over using === and .toString() previously
            if (Object.is(desiredReading, this.state.wdirs)) {
                weatherArray = this.windDirProcessor(desiredReading);
            }
            else {
                // using string interpolation and a template literal, parse the string to a JSON object
                for (let i = 0; i < desiredReading.length; i++) {
                    let dataString = JSON.parse(`{ "x": "${this.state.dates[i]}", "y": ${desiredReading[i]} }`);
                    weatherArray.push(dataString);
                }
            }
            
        return weatherArray;
    }
    // SPEC: Loops through wind directions, and counts the occurences of each one,
    //       then parses to JSON and returns the array of JSON objects
    windDirProcessor = () => {
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
    // SPEC: Makes get to request to API, converts to JSON, sets the new state with the result,
    //       and calls arrayProcessing to process the data
    loadData = () => { 
        // GET request to local api endpoint
        fetch('/api')
        .then(res => res.json())  // convert to json
        .then(                    // change the local state
            (result) => {
                // log result here if wanting to see structure
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
                    {this.state.error && <div>Error: {this.state.error}</div>}
                    
                    {/* If the state isn't loaded, print loading */}
                    {!(this.state.isLoaded) && <LoadingPage />}
                    
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
                                    <WindDirChart dirData={this.createArray(this.state.wdirs)} />       
                                    <WindSpdChart spdData={this.createArray(this.state.wspeeds)} />
                                </div>
                            </div>
                        </div>
                    }

                </div>
            )
        }
            
}

export default Chart;