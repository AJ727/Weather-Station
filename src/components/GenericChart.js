import React from 'react';
import TempChart from './TempChart';
//var LineChart = require('react-chartjs').Line;

// This components purpose is to be imported by actual
// components such as Humidity, Pressure, etc
// and pass in the data specific to each type

class GenericChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        };
        this.loadData = this.loadData.bind(this);
    }
    componentDidMount() {
        this.loadData();
        setInterval(this.loadData, 60000);
    }
    loadData() { 
        fetch('/api')
        .then(res => res.json())
        .then(
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
                    <div>
                        <h1>READINGS</h1>
                        {data.map(item => (
                            <ol key={item.time_stamp}>
                                <li>{"Temperature: " + item.ExtTemp}</li> 
                                <li>{"Humidity: " + item.Humidity}</li> 
                                <li>{"Pressure: " + item.Pressure}</li> 
                                <li>{"Wind Direction: " + item.WindDir}</li>
                            </ol>
                        ))}
                        <TempChart data={data} />>
                    </div>
                )
            }
    }
}

export default GenericChart;