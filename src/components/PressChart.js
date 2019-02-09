import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory';

const PressChart = (props) => (
    <div>
        <VictoryChart theme={VictoryTheme.material}>
            <VictoryLabel text="Pressure Readings" textAnchor="middle" />
            <VictoryLine 
                style={{
                    data: { stroke: "#c43f11" },
                    parent: { border: "1px solid #ccc" }
                }}
                // data={props.data.ExtTemp} <-- this is correct, but we need more data, so trying with dummy data
                // TODO: Change code so that data is saved, and just added on to, instead
                // of replacing the state each time
                data={[
                    { x: 1, y: 2},
                    { x: 2, y: 4},
                    { x: 3, y: 5},
                    { x: 4, y: 8}
                ]}
            />
        </VictoryChart>    
    </div>
)

export default PressChart;