import React from 'react';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryZoomContainer } from 'victory';

class WindSpdChart extends React.Component {
    state = {}
    handleZoom(domain) {
        this.setState({ zoomDomain: domain });
    }

    render() {

<<<<<<< HEAD
        // const dummyData = [
        //     {windspeed: 4, windGust: 11, windBearing: 0}, 
        //     {windSpeed: 4, windGust: 10, windBearing: 45},
        //     {windSpeed: 21, windGust: 31, windBearing: 90},
        //     {windSpeed: 21, windGust: 25, windBearing: 135},
        //     {windSpeed: 21, windGust: 25, windBearing: 180},
        //     {windSpeed: 21, windGust: 23, windBearing: 225}
        // ];

        const directions = {
            0: "E", 45 : "NE", 90: "N", 135: "NW",
            180: "W", 225: "SW", 270: "S", 315: "SE"
          };

        // let windData = {[{x: 0, y: 0}]};

        if (this.props.spdData.length != 0 || this.props.dirData != undefined) {

            /* for (let i = 0; i < this.props.tempData.length; i++) {
                windData[i].x = this.props.dirData[i].x;
                windData[i].y = this.props.spdData[i].y 
            } */

            // console.log(this.props.dirData);
            // console.log(this.props.spdData);
            // console.log(windData);

=======
        for (let i = 0; i < this.props.spdData.length; i++) {
            if (this.props.spdData[i] != undefined) {
                this.props.spdData[i].x = moment(this.props.spdData[i].x);
                this.props.spdData[i] = { x: this.props.spdData[i].x, y: this.props.spdData[i].y }
            }
        }
        
        if (this.props.spdData.length != 0) {
>>>>>>> ab9d88fcfa192b55fc0534d05179b7bd84ab8840
            return (
                <div>
                    <VictoryChart domainPadding={20}
                        theme={VictoryTheme.greyscale}
                        scale={{ x: "time" }}
                        containerComponent={
                            <VictoryZoomContainer 
                                zoomDimension="x"
                                zoomDomain={this.state.zoomDomain}
                                onZoomDomainChange={() => this.handleZoom}
                            />
                        }
                    >
                    <VictoryLabel text="Wind Speed (mph)" x={220} y={30} textAnchor="middle" />
                    <VictoryAxis 
                        fixLabelOverlap={false}    
                    />
                    <VictoryAxis
                        dependentAxis={true}
                        fixLabelOverlap={false}
                        style={{
                            grid: {stroke: "grey", size: 5}
                        }}
                    />
                    <VictoryLine 
                        style={{
                            data: { stroke: "green", strokeWidth: 2 },
                            parent: { border: "1px solid #ccc", background: "#555555" }
                        }}
                        data={this.props.spdData}
                    />
                    </VictoryChart>
                </div>
            );
        }

        //Else return an empty div element.
        else {
            return(<div></div>)
        }
    }
}

export default WindSpdChart;