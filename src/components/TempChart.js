import React from 'react';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryZoomContainer } from 'victory';

// SPEC: Renders the temperature graph

class TempChart extends React.Component {
    state = {}
    handleZoom(domain) {
        this.setState({ zoomDomain: domain });
    }

    render() {
        if (this.props.tempData.length != 0) {
            for (let i = 0; i < this.props.tempData.length; i++) {
                this.props.tempData[i].x = moment(this.props.tempData[i].x);
                this.props.tempData[i] = { x: this.props.tempData[i].x, y: this.props.tempData[i].y }
            }

            let tempColor = "";
            let tempReading = parseFloat(this.props.tempData[this.props.tempData.length-1].y.toFixed(1));

            if (tempReading >= 60.0) {
                tempColor = "#F2B622";
            }
            else if (tempReading < 60.0) {
                tempColor = "#37E3F4";
            }

            return (
                <div>
                    <VictoryChart domainPadding={20}
                        theme={VictoryTheme.greyscale}
                        scale={{ x: "time" }}
                        containerComponent={
                            <VictoryZoomContainer 
                                //zoomDimension="x"
                                zoomDomain={this.state.zoomDomain}
                                onZoomDomainChange={() => this.handleZoom}
                            />
                        }
                    >
                        <VictoryLabel text="Temperature (°F)" x={220} y={30} textAnchor="middle" />
                        <VictoryAxis 
                            fixLabelOverlap={true}
                            tickFormat={tick => moment(tick).format('MMM Do[\n]h:mma')}
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
                                data: { stroke: tempColor, strokeWidth: 1 },
                                parent: { border: "1px solid #ccc", background: "#555555" }
                            }}
                            data={this.props.tempData}
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

export default TempChart;