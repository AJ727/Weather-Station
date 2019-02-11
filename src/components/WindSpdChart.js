import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

const WindSpdChart = ({ weatherData }) => (
    <div>
        {console.log("FROM WINDSPD CHART: " + weatherData)}
        <VictoryChart theme={VictoryTheme.material}>
            <VictoryLabel text="Wind Speed Readings" textAnchor="middle" x={180} y={30} />
            <VictoryLine 
                style={{
                    data: { stroke: "#c43f11" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={[
                    { x: 1, y: weatherData[0].WindSpd ? weatherData[0].WindSpd : 10},
                    { x: 2, y: weatherData[1].WindSpd ? weatherData[1].WindSpd : 10},
                    { x: 3, y: weatherData[2].WindSpd ? weatherData[2].WindSpd : 10},
                    { x: 4, y: weatherData[3].WindSpd ? weatherData[3].WindSpd : 10},
                    { x: 5, y: weatherData[4].WindSpd ? weatherData[4].WindSpd : 10}
                ]}
            />
        </VictoryChart>    
    </div>
)

export default WindSpdChart;