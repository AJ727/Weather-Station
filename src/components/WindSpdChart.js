import React from 'react';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryTooltip, createContainer } from 'victory';

// SPEC: Renders the wind speed graph

class WindSpdChart extends React.Component {
    state = {}
    handleZoom(domain) {
        this.setState({ zoomDomain: domain });
    }

    render() {

        let VictoryZoomVoronoiContainer = createContainer("voronoi");

        if(this.props.toZoom == true) {
            VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
        }

        // Checks if data array is empty. If not empty, render the chart; otherwise, nothing is rendered.
        if (this.props.spdData.length != 0) {
            for (let i = 0; i < this.props.spdData.length; i++) {
                this.props.spdData[i].x = moment(this.props.spdData[i].x);
                this.props.spdData[i] = { x: this.props.spdData[i].x, y: this.props.spdData[i].y }
            }
            return (
                <React.Fragment>
                    <VictoryChart domainPadding={20}
                        theme={VictoryTheme.greyscale}
                        scale={{ x: "time" }}
                        containerComponent={
                            <VictoryZoomVoronoiContainer
                                labels={(d) => `${d.y} MPH \n ${moment(d.x).format('MMM. Do, h:mma')}`}
                                labelComponent={
                                    <VictoryTooltip
                                      flyoutStyle={{ stroke: "green" }}
                                    />
                                }
                            />
                        }
                    >
                        <VictoryLabel text="Wind Speed (MPH)" x={220} y={30} textAnchor="middle" />
                        <VictoryAxis 
                            fixLabelOverlap={true}
                            tickFormat={tick => moment(tick).format('MMM. Do[\n]h:mma')}
                            style={{
                                grid: {stroke: "grey", strokeWidth: .25}
                            }}
                        />
                        <VictoryAxis
                            dependentAxis={true}
                            fixLabelOverlap={false}
                            style={{
                                grid: {stroke: "grey", size: 5}
                            }}
                        />
                        <VictoryLine 
                            animate={{
                                duration: 0,
                                onLoad: {duration: 2000}
                            }}
                            style={{
                                data: { stroke: "green", strokeWidth: 1 },
                                parent: { border: "1px solid #ccc", background: "#555555" },
                                labels: {fill: "green"}
                            }}
                            data={this.props.spdData}
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