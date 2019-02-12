import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

const WindSpdChart = ({ spdData }) => (
    <div>
        <VictoryChart theme={VictoryTheme.material}>
            <VictoryLabel text="Wind Speed Readings" textAnchor="middle" x={180} y={30} />
            <VictoryLine 
                style={{
                    data: { stroke: "#c43f11" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={spdData}
            />
        </VictoryChart>    
    </div>
)

export default WindSpdChart;