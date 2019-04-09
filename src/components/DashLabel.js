import React from 'react';
import moment from 'moment';

let tempReading, tempImage, humidReading, pressReading, spdReading, dirReading, curDate, curTime = "";
let tempColor = {};

class DashLabel extends React.Component {
    state = {}

    render() {   
        if (this.props.tempData.length != 0 &&   
            this.props.humidData.length != 0 &&  
            this.props.spdData.length != 0)
            {

            tempReading = parseFloat(this.props.tempData[this.props.tempData.length-1].y.toFixed(0));
            humidReading = this.props.humidData[this.props.humidData.length-1].y.toFixed(0);
            pressReading = this.props.pressData[this.props.pressData.length-1].y.toFixed(2);
            spdReading = this.props.spdData[this.props.spdData.length-1].y.toFixed(0);
            dirReading = this.props.curWinDir;

            curDate = moment(this.props.tempData[this.props.tempData.length-1].x).format("MMMM Do");
            curTime = moment(this.props.tempData[this.props.tempData.length-1].x).format("h:mm a");

            if (tempReading >= 60.0) {
                tempColor = { color: "#F2B622" };
                tempImage="/images/meme_sun.gif";
                if (humidReading >= 70 && pressReading < 30) {
                    tempImage="/images/meme_cloud.gif";
                }
            }
            else if (tempReading < 60.0) {
                tempColor = { color: "#37E3F4" };
                tempImage="/images/meme_flake.gif";
                if (humidReading >= 70 && pressReading <= 29.90) {
                    tempImage="/images/meme_cloud.gif";
                }
            }
            
            return (
                <div className="current-dash">
                    <h3 className="date-text">{curDate}</h3>
                    <h3 className="locale-text">{this.props.location}</h3>
                    <h3 className="F-temp-text" style={tempColor}><img src={tempImage} width="50px" height="50px"></img>{tempReading}&#176;F</h3>
                    {/* <h3 className="C-temp-text" style={tempColor}><img src={tempImage} width="50px" height="50px"></img>{tempReading}&#176;F</h3> */}
                    <h3 className="time-text">Last updated at {curTime}</h3>
                    <div className="reading-dash">
                        <h3 className="press-text">Pressure<br />{pressReading} inHg</h3>
                        <h3 className="humid-text">Humidity<br />{humidReading}%</h3>
                        <h3 className="wind-text">Wind<br /><span>{dirReading}</span> {spdReading} MPH</h3>
                    </div>
                </div>
            );
        }
        else {
            return(<React.Fragment></React.Fragment>);
        }
    }
}

export default DashLabel;