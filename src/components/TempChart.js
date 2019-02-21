import React from 'react';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryZoomContainer } from 'victory';

class TempChart extends React.Component {
    // state = {
    //     zoomDomain: {x: [new Date(1990, 1, 1), new Date(2009, 1, 1)]}
    // };
    constructor() {
        super();
        this.state = {};
    }
    handleZoom = (domain) => {
        this.setState({ zoomDomain: domain });
    };
    render() {
        return (
            <div>
                <VictoryChart domainPadding={20}
                    theme={VictoryTheme.material}
                    scale={{ x: "time" }}
                    containerComponent={
                        <VictoryZoomContainer 
                        zoomDimension="x"
                        zoomDomain={this.state.zoomDomain}
                        onZoomDomainChange={this.handleZoom.bind(this)}/>
                    }
                >
                <VictoryLabel text="Temperature Readings" x={180} y={30} textAnchor="middle" />
                <VictoryAxis 
                    tickFormat={(x) => moment(x).format("MM-DD hh:mm:ss")}
                    fixLabelOverlap={true}
                    tickLabelComponent={<VictoryLabel angle={-20} />}
                />
                <VictoryAxis
                    dependentAxis
                    tickLabelComponent={<VictoryLabel angle={-20}/>}
                    style={{
                        grid: {stroke: "orange", size: 5}
                    }}
                />
                <VictoryLine 
                    style={{
                        data: { stroke: "#4F3FE6", strokeWidth: 2 },
                        parent: { border: "1px solid #ccc", background: "#555555" }
                    }}
                    data={this.props.tempData}
                    animate={{
                        onLoad: { duration: 300 }
                    }}
                />
                </VictoryChart>
            </div>
        )
    }
}

export default TempChart;