import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryZoomContainer, VictoryStack, VictoryPolarAxis, VictoryBar } from 'victory';

class WindSpdChart extends React.Component {
    state = {}

    render() {

        const directions = {
            0: "E", 45 : "NE", 90: "N", 135: "NW",
            180: "W", 225: "SW", 270: "S", 315: "SE"
          };

        if (this.props.dirData != undefined && this.props.dirData.length != 0) {
            return (
                <div>
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
                            labelPlacement="vertical"
                            tickValues={Object.keys(directions).map((k) => +k)}
                            tickFormat={Object.values(directions)}
                        />
                        <VictoryBar
                            style={{ data: { fill: "#c43a31", width: 50 }}}
                            data={this.props.dirData}
                        />
                    </VictoryChart>
                </div>
            );
        }

        else {
            return(<div></div>)
        }
    }
}

export default WindSpdChart;