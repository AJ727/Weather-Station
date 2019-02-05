import React from 'react';
import { VictoryLine, VictoryChart } from 'victory';

const TempChart = (props) => (
    <div>
        <VictoryChart>
            <VictoryLine 
                data={props.data}
                x="x-axis"
                y="y-axis" 
            />
        </VictoryChart>    
    </div>
)

export default TempChart;