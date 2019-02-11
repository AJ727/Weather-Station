import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

const PressChart = ({ weatherData }) => (
    <div>
        <VictoryChart theme={VictoryTheme.material}>
            <VictoryLabel text="Pressure Readings" x={180} y={30} textAnchor="middle" />
            <VictoryLine 
                style={{
                    data: { stroke: "#c43f11" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={[
                    { x: 1, y: weatherData[0].Pressure},
                    { x: 2, y: weatherData[1].Pressure},
                    { x: 3, y: weatherData[2].Pressure},
                    { x: 4, y: weatherData[3].Pressure},
                    { x: 5, y: weatherData[4].Pressure}
                ]}
            />
        </VictoryChart>    
    </div>
)

export default PressChart;