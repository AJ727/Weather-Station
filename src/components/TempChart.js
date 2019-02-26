import React from 'react';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryZoomContainer } from 'victory';

class TempChart extends React.Component {
    
    constructor() {
        super();
        this.state = {};
    }
    handleZoom(domain) {
        this.setState({ zoomDomain: domain });
    }

    render() {

        for (let i = 0; i < this.props.tempData.length; i++) {
            if (this.props.tempData[i] != undefined) {
                this.props.tempData[i].x = moment(this.props.tempData[i].x);
                this.props.tempData[i] = { x: this.props.tempData[i].x, y: this.props.tempData[i].y }
            }
        }
        
        if (this.props.tempData.length != 0) {
            return (
                <div>
                    <VictoryChart domainPadding={20}
                        theme={VictoryTheme.greyscale}
                        scale={{ x: "time" }}
                        containerComponent={
                            <VictoryZoomContainer 
                                zoomDimension="x"
                                zoomDomain={this.state.zoomDomain}
                                onZoomDomainChange={this.handleZoom.bind(this)}
                            />
                        }
                    >
                    <VictoryLabel text="Temperature (Degrees Farenheit)" x={180} y={30} textAnchor="middle" />
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
                            data: { stroke: "#4F3FE6", strokeWidth: 2 },
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