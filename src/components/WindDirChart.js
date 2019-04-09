import React from 'react';
import { VictoryChart, VictoryLabel, VictoryPolarAxis, VictoryBar, VictoryVoronoiContainer, VictoryTooltip } from 'victory';

// SPEC: Renders the wind direction graph

class WindSpdChart extends React.Component {
    state = {}

    render() {

        const directions = {
          0: "E", 45 : "NE", 90: "N", 135: "NW",
          180: "W", 225: "SW", 270: "S", 315: "SE"
        };

        if (this.props.dirData != undefined && this.props.dirData.length != 0) {
            return (
                <React.Fragment>
                    <VictoryChart polar 
                        domainPadding={{y: 5}}
                        domain={{ x: [0, 360] }}
                        height={400} width={400}
                        innerRadius={20}

                        containerComponent={
                            <VictoryVoronoiContainer
                                labels={(d) => `${d.y}`}
                                labelComponent={
                                    <VictoryTooltip
                                      flyoutStyle={{ stroke: "#9345f9" }}
                                    />
                                }
                            />
                        }
                    >
                        <VictoryLabel text="Wind Direction (Frequency)" x={210} y={20} textAnchor="middle" />

                        <VictoryPolarAxis dependentAxis 
                            animate={{
                                duration: 0,
                                onLoad: {duration: 2000}
                            }}
                            axisAngle={90}
                            labelPlacement="vertical"
                            style={{
                                axis: {stroke: "none"},
                                grid: { stroke: "grey", strokeDasharray: "4, 8" }
                            }}
                        />

                        <VictoryPolarAxis
                            labelPlacement="vertical"
                            tickValues={Object.keys(directions).map((k) => +k)}
                            tickFormat={Object.values(directions)}
                        />

                        <VictoryBar
                            style={{ 
                                data: { 
                                    fill: "#9345f9", 
                                    width: 50, 
                                    strokeWidth: 1, 
                                    stroke: "#9345f9", 
                                    fillOpacity: 0.7 
                                },
                                labels: {fill: "#9345f9"}
                            }}
                            data={this.props.dirData}
                        />    
                    </VictoryChart>
                </React.Fragment>
            );
        }

        else {
            return(<React.Fragment></React.Fragment>)
        }
    }
}

export default WindSpdChart;