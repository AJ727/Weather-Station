import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

const WindSpdChart = ({ weatherData }) => (
    <div>
        <VictoryChart theme={VictoryTheme.material}>
            <VictoryLabel text="Wind Speed Readings" textAnchor="middle" x={180} y={30} />
            <VictoryLine 
                style={{
                    data: { stroke: "#c43f11" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={[
                    { x: 1, y: weatherData[0].WindSpd},
                    { x: 2, y: weatherData[1].WindSpd},
                    { x: 3, y: weatherData[2].WindSpd},
                    { x: 4, y: weatherData[3].WindSpd},
                    { x: 5, y: weatherData[4].WindSpd}
                ]}
            />
        </VictoryChart>    
    </div>
)

export default WindSpdChart;