import React from 'react';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis, VictoryZoomContainer } from 'victory';

class TempChart extends React.Component {
    state = {
        zoomDomain: {x: [new Date(1990, 1, 1), new Date(2009, 1, 1)]}
    };
    handleZoom = (domain) => {
        this.setState({ zoomDomain: domain });
    };
    render() {
        return (
            <div>
                <VictoryChart domainPadding={20}
                theme={VictoryTheme.material}
                scale={{ x: "time" }}
                 >
                <VictoryLabel text="Temperature Readings" x={180} y={30} textAnchor="middle" />
                <VictoryAxis 
                    tickFormat={(x) => new moment(x).minute()}
                />
                <VictoryLine 
                    style={{
                        data: { stroke: "#4F3FE6", strokeWidth: 2 },
                        parent: { border: "1px solid #ccc", background: "#555555" }
                    }}
                    data={this.props.tempData}
                    animate={{
                        onLoad: { duration: 300 }
                    }}
                />
                </VictoryChart>
            </div>
        )
    }
}

                // <VictoryChart domainPadding={20}
                //     theme={VictoryTheme.material}
                //     scale={{ x: "time" }}
                //     containerComponent={
                //         <VictoryZoomContainer
                //             zoomDimension="x"
                //             zoomDomain={this.state.zoomDomain}
                //             onZoomDomainChange = {() => this.handleZoom}
                //         />
                //     }
                // >
                // <VictoryLabel text="Temperature Readings" x={180} y={30} textAnchor="middle" />
                //     <VictoryLine 
                //         style={{
                //             data: { stroke: "#4F3FE6", strokeWidth: 2 },
                //             parent: { border: "1px solid #ccc", background: "#555555" }
                //         }}
                //         /*data={this.props.tempData}*/
                //         data = {[
                //             { x: "Mon Feb 01 1982", y: 125 },
                //             { x: new Date(1987, 1, 1), y: 257 },
                //             { x: new Date(1993, 1, 1), y: 345 },
                //             { x: new Date(1997, 1, 1), y: 515 },
                //             { x: new Date(2001, 1, 1), y: 132 },
                //             { x: new Date(2005, 1, 1), y: 305 },
                //             { x: new Date(2011, 1, 1), y: 270 },
                //             { x: new Date(2015, 1, 1), y: 470 }
                //           ]}
                //         animate={{
                //             onLoad: { duration: 300 }
                //         }}
                //     />
                // </VictoryChart>

export default TempChart;