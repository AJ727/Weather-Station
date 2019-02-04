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
        setInterval(this.loadData, 10000);
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
                    <ul>
                        {data.map(item => (
                            <li key={item.time_stamp}>
                                {item.ExtTemp} {item.Humidity} {item.Pressure} {item.WindDir}
                            </li>
                        ))}
                    </ul>
                )
            }
    }
}

export default GenericChart;