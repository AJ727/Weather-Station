import React from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

const WindDirChart = ({ dirData }) => (
    <div>
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryLabel text="Wind Direction Readings" x={180} y={30} textAnchor="middle" />
            <VictoryBar 
                style={{
                    data: { stroke: "#c43f11", strokeWidth: 5 },
                    parent: { border: "1px solid #ccc" }
                }}
                // data={props.data.ExtTemp} <-- this is correct, but we need more data, so trying with dummy data
                // TODO: Change code so that data is saved, and just added on to, instead
                // of replacing the state each time
                data={dirData}
                animate={{
                    onLoad: { duration: 300 }
                }}
            />
        </VictoryChart>    
    </div>
)

export default WindDirChart;