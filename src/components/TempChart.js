import React from 'react';
import { VictoryLine, VictoryChart } from 'victory';

const TempChart = (props) => (
    <div>
        <VictoryChart>
            <VictoryLine 
                data={props.data.ExtTemp}      
            />
        </VictoryChart>    
    </div>
)

export default TempChart;