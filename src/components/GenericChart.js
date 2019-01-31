import React from 'react';
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
                <h1>THIS IS SOME YUNG DATA</h1>
            </div>
        )
    }
}



export default GenericChart;