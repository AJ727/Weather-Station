import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

const HumidChart = ({ humidData }) => (
    <div>
        <VictoryChart theme={VictoryTheme.material}>
            <VictoryLabel text="Humidity Readings" textAnchor="middle" x={180} y={30} />
            <VictoryLine 
                style={{
                    data: { stroke: "#c43f11" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={humidData}
            />
        </VictoryChart>    
    </div>
)

export default HumidChart;