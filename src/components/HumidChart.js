import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

const HumidChart = ({ weatherData }) => (
    <div>
        <VictoryChart theme={VictoryTheme.material}>
            <VictoryLabel text="Humidity Readings" textAnchor="middle" x={180} y={30} />
            <VictoryLine 
                style={{
                    data: { stroke: "#c43f11" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={[
                    { x: 1, y: weatherData[0].Humidity},
                    { x: 2, y: weatherData[1].Humidity},
                    { x: 3, y: weatherData[2].Humidity},
                    { x: 4, y: weatherData[3].Humidity},
                    { x: 5, y: weatherData[4].Humidity}
                ]}
            />
        </VictoryChart>    
    </div>
)

export default HumidChart;