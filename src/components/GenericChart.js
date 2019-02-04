import React from 'react';
import TempChart from './TempChart';
//var LineChart = require('react-chartjs').Line;

// This components purpose is to be imported by actual
// components such as Humidity, Pressure, etc
// and pass in the data specific to each type

export class GenericChart extends React.Component {
    // state should store data, then pass into components through props
    state = {
        readings: null
    };
    componentDidMount() {
        this.loadData();
        setInterval(this.loadData, 10000);
    }
    async loadData() {
        try {
            fetch('/api', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(async res => this.setState({ readings: res}))
            .catch((err) => console.log('Error ' + err));
        }
        catch(e) {
            console.log(e + " THIS IS THE EXCEPTION HANDLER IN GENCHART #3");
        }
    }
    render(){
        return(
            <div>
                <TempChart />
                {console.log(this.state.readings)}
            </div>
        )
    }
}

export default GenericChart;