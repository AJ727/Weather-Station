import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

const WindSpdChart = ({ spdData }) => (
    <div>
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryLabel text="Wind Speed Readings" textAnchor="middle" x={180} y={30} />
            <VictoryLine 
                style={{
                    data: { stroke: "#c43f11" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={spdData}
                animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                }}
            />
        </VictoryChart>    
    </div>
)

export default WindSpdChart;