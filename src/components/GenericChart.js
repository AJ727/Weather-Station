import React from 'react';
import moment from 'moment';
//var LineChart = require('react-chartjs').Line;

// This components purpose is to be imported by actual
// components such as Humidity, Pressure, etc
// and pass in the data specific to each type

export class GenericChart extends React.Component {
    state = {
        data: [
            {}
        ]
    };
    // componentDidMount() {
    //     fetch('https://kaar-weather.herokuapp.com/api/GET_DATA?results=10')
    //     .then(results => {
    //         return results.json();
    //     }).then(data => {
    //         console.log(data);
    //     })
    // }
    render(){
        return(
            <div>
                {console.log(moment().format("YYYY-MM-DD hh:mm:ss.sss"))}
                <h1>THIS IS SOME YUNG DATA</h1>
            </div>
        )
    }
}



export default GenericChart;