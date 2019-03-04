import React from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryPolarAxis } from 'victory';

const WindDirChart = ({ dirData }) => (
    <div>
        {/* <VictoryChart polar 
            domain={{ x: [0, 360] }}
            height={400} width={400}
        >
            <VictoryPolarAxis dependentAxis 
                style={{
                    axis: {stroke: "none"},
                    tickLabels: { fill: "none"},
                     grid: { stroke: "grey", strokeDasharray: "4, 8" }
                  }}
            />
            <VictoryPolarAxis
                tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
            />
            <VictoryBar
                style={{ data: { fill: "#c43a31", width: 50 }}}
                data={dirData}
            />
                </VictoryChart> */}

        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryLabel text="Wind Direction (Polar)" x={220} y={30} textAnchor="middle" />
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