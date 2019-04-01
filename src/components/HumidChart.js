import React from 'react';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryZoomContainer } from 'victory';

// SPEC: Renders the humidity graph

class HumidChart extends React.Component {
    state = {}
    handleZoom(domain) {
        this.setState({ zoomDomain: domain });
    }

    render() {  
        // If data is present in the passed in array, format the data to Victory's desired format
        if (this.props.humidData.length != 0) {
            for (let i = 0; i < this.props.humidData.length; i++) {
                this.props.humidData[i].x = moment(this.props.humidData[i].x);
                this.props.humidData[i] = { x: this.props.humidData[i].x, y: this.props.humidData[i].y }
            }
            return (
                <React.Fragment>
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
                        <VictoryLabel text="Humidity (Percentage)" x={220} y={30} textAnchor="middle" />
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
                                data: { stroke: "blue", strokeWidth: 1 },
                                parent: { border: "1px solid #ccc", background: "#555555" }
                            }}
                            data={this.props.humidData}
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

export default HumidChart;