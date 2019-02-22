import React from 'react';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryZoomContainer } from 'victory';

class HumidChart extends React.Component {
    render() {
        return (
            <div>
                <VictoryChart domainPadding={20} 
                    theme={VictoryTheme.material}
                    scale={{ x: "time" }}
                    containerComponent={
                        <VictoryZoomContainer 
                        
                        />
                    }
                >
                    <VictoryLabel text="Humidity Readings" textAnchor="middle" x={180} y={30} />
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
                            data: { stroke: "#DC272D", strokeWidth: 2 },
                            parent: { border: "1px solid #ccc" }
                        }}
                        data={this.props.humidData}
                        animate={{
                            onLoad: { duration: 300 }
                        }}
                    />
                </VictoryChart>    
            </div>
        )
    }
} 

export default HumidChart;