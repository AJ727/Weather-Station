import React from 'react';
import moment from 'moment';

let tempReading, tempImage, humidReading, pressReading, spdReading, dirReading, curDate, curTime, prevTemp, prevHumid, prevPress, prevWindSpd = "";
let tempColor = {};

class DashLabel extends React.Component {
    state = {}

    //Changes arrow image to reflect if current reading values are ascending or descending
    checkChange = (current, prev) => {
        if (current > prev) {
            return "/images/up_arrow.png";
        }
        else if (current < prev) {
            return "/images/down_arrow.png";
        }
        else if (current == prev || current == 0) {
            return "/images/dashes.png";
        }
    }

    render() {   
        if (this.props.tempData.length != 0 &&   
            this.props.humidData.length != 0 &&  
            this.props.spdData.length != 0)
            {

            tempReading = this.props.tempData[this.props.tempData.length-1].y.toFixed(0);
            humidReading = this.props.humidData[this.props.humidData.length-1].y.toFixed(1);
            pressReading = this.props.pressData[this.props.pressData.length-1].y.toFixed(2);
            spdReading = this.props.spdData[this.props.spdData.length-1].y.toFixed(1);
            dirReading = this.props.curWinDir;

            prevTemp = this.props.tempData[this.props.tempData.length-2].y.toFixed(0);
            prevHumid = this.props.humidData[this.props.humidData.length-2].y.toFixed(1);
            prevPress = this.props.pressData[this.props.pressData.length-2].y.toFixed(2);
            prevWindSpd = this.props.spdData[this.props.spdData.length-2].y.toFixed(1);

            curDate = moment().format("MMMM Do");
            curTime = moment(this.props.tempData[this.props.tempData.length-1].x).format("h:mm a");
            
            //Changes the image and font-color of current temperature reading
            if (tempReading >= 60.0) {
                tempColor = { color: "#F2B622" };
                tempImage="/images/sun.gif";
                if (humidReading >= 80 && pressReading < 29.80) {
                    tempImage="/images/cloud.gif";
                }
            }
            else if (tempReading < 60.0) {
                tempColor = { color: "#37E3F4" };
                tempImage="/images/flake.gif";
                if (humidReading >= 80 && pressReading < 29.80) {
                    tempImage="/images/cloud.gif";
                }
            }
            
            return (
                <div className="current-dash">
                    <h3 className="date-text">{curDate}</h3>
                    <h3 className="locale-text">{this.props.location}</h3>
                    <h3 className="F-temp-text" style={tempColor}><img src={tempImage} width="50px" height="50px" /><img src={this.checkChange(tempReading, prevTemp)} width="45px" height="45px" />{tempReading}&#176;F</h3>
                    <h3 className="time-text">Last updated at {curTime}</h3>
                    <div className="reading-dash">
                        <h3 className="press-text">Pressure<br /><img src={this.checkChange(pressReading, prevPress)} width="15px" height="15px" />{pressReading} inHg</h3>
                        <h3 className="humid-text">Humidity<br /><img src={this.checkChange(humidReading, prevHumid)} width="15px" height="15px" />{humidReading}%</h3>
                        <h3 className="wind-text">Wind<br /><span>{dirReading}</span><img src={this.checkChange(spdReading, prevWindSpd)} width="15px" height="15px" />{spdReading} MPH</h3>
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