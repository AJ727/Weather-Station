import React from 'react';
import TempChart from './TempChart';
//var LineChart = require('react-chartjs').Line;

// This components purpose is to be imported by actual
// components such as Humidity, Pressure, etc
// and pass in the data specific to each type

export class GenericChart extends React.Component {
    // state should store data, then pass into components through props
    state = {
        data: null
    };
    // componentDidMount() {
    //     this.loadData();
    //     setInterval(this.loadData, 10000);
    // }
    // async loadData() {
    //     try {
    //         fetch('https://kaar-weather.herokuapp.com/api/FETCH')
    //             .then(results => {
    //                 console.log("Error in GenChart fetch #1");
    //                 return results.json();
    //         }).then(data => {
    //             console.log(data + " from GenChart #2");
    //             this.setState(() => ({ data }));
    //             console.log(this.state.data + " this is the state from GenChart");
    //         })
    //     }
    //     catch(e) {
    //         console.log(e + " <-- THIS IS THE EXCEPTION HANDLER IN GENCHART #3");
    //     }
    // }
    render(){
        return(
            <div>
                <TempChart />
            </div>
        )
    }
}

export default GenericChart;