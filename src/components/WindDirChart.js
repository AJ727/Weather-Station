import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory';

const WindDirChart = (props) => (
    <div>
        <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine 
                style={{
                    data: { stroke: "#c43f11" },
                    parent: { border: "1px solid #ccc" }
                }}
                // data={props.data.ExtTemp} <-- this is correct, but we need more data, so trying with dummy data
                // TODO: Change code so that data is saved, and just added on to, instead
                // of replacing the state each time
                data={[
                    { x: 1, y: 4},
                    { x: 2, y: 2},
                    { x: 3, y: 9},
                    { x: 4, y: 3}
                ]}
            />
        </VictoryChart>    
    </div>
)

export default WindDirChart;