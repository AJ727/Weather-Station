import React from 'react';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryTooltip, createContainer } from 'victory';

// SPEC: Renders the pressure graph

class PressChart extends React.Component {
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
        if (this.props.pressData.length != 0) {
            for (let i = 0; i < this.props.pressData.length; i++) {
                this.props.pressData[i].x = moment(this.props.pressData[i].x);
                this.props.pressData[i] = { x: this.props.pressData[i].x, y: this.props.pressData[i].y }
            }

            return (
                <React.Fragment>
                    <VictoryChart domainPadding={20}
                        theme={VictoryTheme.greyscale}
                        scale={{ x: "time" }}
                        containerComponent={
                            <VictoryZoomVoronoiContainer
                                labels={(d) => `${d.y} inHg \n ${moment(d.x).format('MMM. Do, h:mma')}`}
                                labelComponent={
                                    <VictoryTooltip
                                      flyoutStyle={{ stroke: "red" }}
                                    />
                                }
                            />
                        }
                    >
                        <VictoryLabel text="Barometric Pressure (inHg)" x={220} y={30} textAnchor="middle" />
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
                                data: { stroke: "red", strokeWidth: 1 },
                                parent: { border: "1px solid #ccc", background: "#555555" },
                                labels: {fill: "red"}
                            }}
                            data={this.props.pressData}
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

export default PressChart;