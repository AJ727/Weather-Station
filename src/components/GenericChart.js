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
            data: []
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
        fetch('/api')
        .then(res => res.json())  // convert to json
        .then(                    // change the local state
            (result) => {
                this.setState({
                    isLoaded: true,
                    data: result.Readings
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
            const {error, data, isLoaded} = this.state;
            if(error){
                return <div>Error: {error.message}</div>
            }
            else if (!isLoaded) {
                return <div>Loading...</div>
            }
            else {
                return (
                    <div className="wrapper">
                    <div>
                    {console.log(data)}
                        <h1>READINGS</h1>
                        {data.map(item => (
                            <ol key={item.time_stamp}>
                                <li>{"Temperature: " + item.ExtTemp}</li> 
                                <li>{"Humidity: " + item.Humidity}</li> 
                                <li>{"Pressure: " + item.Pressure}</li> 
                                <li>{"Wind Direction: " + item.WindDir}</li>
                            </ol>
                        ))}
                    </div>
                        <div className="chart-wrapper">
                        <div className="gen_charts" >
                            <TempChart data={data} />
                            <HumidChart data={data} />
                        </div>

                        <div className="gen_charts">
                            <PressChart data={data} />         
                            <WindDirChart data={data} />
                        </div>
                        </div>
                    
                    </div>
                )
            }
    }
}

export default GenericChart;