import React from 'react';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryZoomContainer } from 'victory';

class WindSpdChart extends React.Component {
    state = {}
    handleZoom(domain) {
        this.setState({ zoomDomain: domain });
    }

    render() {

        for (let i = 0; i < this.props.spdData.length; i++) {
            if (this.props.spdData[i] != undefined) {
                this.props.spdData[i].x = moment(this.props.spdData[i].x);
                this.props.spdData[i] = { x: this.props.spdData[i].x, y: this.props.spdData[i].y }
            }
        }
        
        if (this.props.spdData.length != 0) {
            return (
                <div>
                    <VictoryChart domainPadding={20}
                        theme={VictoryTheme.greyscale}
                        scale={{ x: "time" }}
                        containerComponent={
                            <VictoryZoomContainer 
                                zoomDimension="x"
                                zoomDomain={this.state.zoomDomain}
                                onZoomDomainChange={() => this.handleZoom}
                            />
                        }
                    >
                    <VictoryLabel text="Wind Speed (mph)" x={220} y={30} textAnchor="middle" />
                    <VictoryAxis 
                        fixLabelOverlap={false}    
                    />
                    <VictoryAxis
                        dependentAxis={true}
                        fixLabelOverlap={false}
                        style={{
                            grid: {stroke: "grey", size: 5}
                        }}
                    />
                    <VictoryLine 
                        style={{
                            data: { stroke: "green", strokeWidth: 2 },
                            parent: { border: "1px solid #ccc", background: "#555555" }
                        }}
                        data={this.props.spdData}
                    />
                    </VictoryChart>
                </div>
            );
        }

        //Else return an empty div element.
        else {
            return(<div></div>)
        }
    }
}

export default WindSpdChart;