import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

const TempChart = ({ tempData }) => (
    <div>
        <VictoryChart theme={VictoryTheme.material}>
            <VictoryLabel text="Temperature Readings" x={180} y={30} textAnchor="middle" />
            <VictoryLine 
                style={{
                    data: { stroke: "#c43f11" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={tempData}
            />
        </VictoryChart>    
    </div>
)

export default TempChart;