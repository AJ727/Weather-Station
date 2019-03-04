import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryZoomContainer, VictoryPolarAxis, VictoryBar } from 'victory';

class WindSpdChart extends React.Component {
    state = {}

    render() {

        // const dummyData = [
        //     {windspeed: 4, windGust: 11, windBearing: 0}, 
        //     {windSpeed: 4, windGust: 10, windBearing: 45},
        //     {windSpeed: 21, windGust: 31, windBearing: 90},
        //     {windSpeed: 21, windGust: 25, windBearing: 135},
        //     {windSpeed: 21, windGust: 25, windBearing: 180},
        //     {windSpeed: 21, windGust: 23, windBearing: 225}
        // ];

        const directions = {
            0: "E", 45 : "NE", 90: "N", 135: "NW",
            180: "W", 225: "SW", 270: "S", 315: "SE"
          };

        //let windData = {[{x: 0, y: 0}]};

        if (this.props.spdData.length != 0 || this.props.dirData != undefined) {

            // for (let i = 0; i < this.props.tempData.length; i++) {
            //     windData[i].x = this.props.dirData[i].x;
            //     windData[i].y = this.props.spdData[i].y 
            // }

            // // console.log(this.props.dirData);
            // // console.log(this.props.spdData);
            // console.log(windData);

            return (

                <VictoryChart polar 
                    domain={{ x: [0, 360] }}
                    height={400} width={400}
                >
                    <VictoryPolarAxis dependentAxis 
                        style={{
                            axis: {stroke: "none"},
                            tickLabels: { fill: "none"},
                            grid: { stroke: "grey", strokeDasharray: "4, 8" }
                        }}
                    />
                    <VictoryPolarAxis
                        tickValues={Object.keys(directions).map((k) => +k)}
                        tickFormat={Object.values(directions)}
                    />
                    <VictoryBar
                        style={{ data: { fill: "#c43a31", width: 50 }}}
                        data={[ {x: 0, y: 11}, 
                                {x: 45, y: 15},
                                {x: 90, y: 3},
                                {x: 135, y: 25},
                                {x: 180, y: 12},
                                {x: 225, y: 30},
                                {x: 270, y: 13},
                                {x: 315, y: 18}
                        ]}
                    />
                </VictoryChart>

            );
        }

        else {
            return(<div></div>)
        }
    }
}

export default WindSpdChart;