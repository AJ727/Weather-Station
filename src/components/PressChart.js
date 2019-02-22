import React from 'react';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryZoomContainer } from 'victory';

class PressChart extends React.Component {

    render() {
        return (
            <div>
                <VictoryChart domainPadding={20}
                    theme={VictoryTheme.material}
                    scale={{ x: "time" }}
                    domainPadding={{ y: [20, 20] }}
                    containerComponent={
                        <VictoryZoomContainer 
                        
                        />
                    }
                >
                <VictoryLabel text="Pressure Readings" x={180} y={30} textAnchor="middle" />
                <VictoryAxis 
                    tickFormat={(x) => new moment(x).format("MM-DD hh:mm")}
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
                    data={this.props.pressData}
                    animate={{
                        onLoad: { duration: 300 }
                    }}
                />
                </VictoryChart>
            </div>
        )
    }
}

export default PressChart;