import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis } from 'victory';

const TempChart = ({ tempData }) => (
    <div>
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}
            scale={{x : "time"}}
        >
            <VictoryLabel text="Temperature Readings" x={180} y={30} textAnchor="middle" />
            <VictoryLine 
                style={{
                    data: { stroke: "#c43f11" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={tempData}
                animate={{
                    onLoad: { duration: 300 }
                }}
            />
        </VictoryChart>    
    </div>
)

export default TempChart;