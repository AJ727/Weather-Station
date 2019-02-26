import React from 'react';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryZoomContainer } from 'victory';

class PressChart extends React.Component {
    
    constructor() {
        super();
        this.state = {};
    }
    handleZoom(domain) {
        this.setState({ zoomDomain: domain });
    }

    render() {

        for (let i = 0; i < this.props.pressData.length; i++) {
            if (this.props.pressData[i] != undefined) {
                this.props.pressData[i].x = moment(this.props.pressData[i].x);
                this.props.pressData[i] = { x: this.props.pressData[i].x, y: this.props.pressData[i].y }
            }
        }
        
        if (this.props.pressData.length != 0) {
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
                    <VictoryLabel text="Pressure (inches Hg)" x={180} y={30} textAnchor="middle" />
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
                            data: { stroke: "orange", strokeWidth: 2 },
                            parent: { border: "1px solid #ccc", background: "#555555" }
                        }}
                        data={this.props.pressData}
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

export default PressChart;