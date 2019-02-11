import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

const TempChart = ({ weatherData }) => (
    <div>
        {console.log(props)}
        <VictoryChart theme={VictoryTheme.material}>
            <VictoryLabel text="Temperature Readings" x={180} y={30} textAnchor="middle" />
            <VictoryLine 
                style={{
                    data: { stroke: "#c43f11" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={[
                    { x: 1, y: weatherData[0].ExtTemp},
                    { x: 2, y: weatherData[1].ExtTemp},
                    { x: 3, y: weatherData[2].ExtTemp},
                    { x: 4, y: weatherData[3].ExtTemp},
                    { x: 5, y: weatherData[4].ExtTemp}
                ]}
            />
        </VictoryChart>    
    </div>
)

export default TempChart;