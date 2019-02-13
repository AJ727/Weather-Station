import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

const PressChart = ({ pressData }) => (
    <div>
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryLabel text="Pressure Readings" x={180} y={30} textAnchor="middle" />
            <VictoryLine 
                style={{
                    data: { stroke: "#c43f11" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={pressData}
            />
        </VictoryChart>    
    </div>
)

export default PressChart;