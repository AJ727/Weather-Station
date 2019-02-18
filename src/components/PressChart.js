import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

const PressChart = ({ pressData }) => (
    <div>
        <VictoryChart domainPadding={20} 
            theme={VictoryTheme.material}
            domainPadding={{ y: [20, 20] }}
        >
            <VictoryLabel text="Pressure Readings" x={180} y={30} textAnchor="middle" />
            <VictoryLine 
                style={{
                    data: { stroke: "#BA2AB1", strokeWidth: 2 },
                    parent: { border: "1px solid #ccc" }
                }}
                data={pressData}
                animate={{
                    onLoad: { duration: 300 }
                }}
            />
        </VictoryChart>    
    </div>
)

export default PressChart;