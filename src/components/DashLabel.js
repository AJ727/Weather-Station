import React from 'react';

let tempReading, tempImage, humidReading, pressReading, spdReading, dirReading = "";
let tempColor = {};

class DashLabel extends React.Component {
    state = {}
    render() {   
        if (this.props.tempData.length != 0 &&   
            this.props.humidData.length != 0 &&  
            this.props.spdData.length != 0 &&
            this.props.dirData.length != 0) {

            tempReading = parseFloat(this.props.tempData.pop().y.toFixed(1));
            humidReading = this.props.humidData.pop().y.toFixed(1);
            pressReading = this.props.pressData.pop().y.toFixed(1);
            spdReading = this.props.spdData.pop().y.toFixed(1);

            switch(this.props.dirData.pop().x) {
                case 0: dirReading = "E"; break;
                case 45: dirReading ="NE"; break;
                case 90: dirReading = "N"; break;
                case 135: dirReading = "NW"; break;
                case 180: dirReading = "W"; break;
                case 225: dirReading = "SW"; break;
                case 270: dirReading = "S"; break;
                case 315: dirReading = "SE"; break;
            }

            if (tempReading >= 60.0) {
                tempColor = { color: "#F2B622" };
                tempImage="/images/meme_sun.gif";
            }
            else if (tempReading < 60.0) {
                tempColor = { color: "#37E3F4" };
                tempImage="/images/meme_flake.gif";
            }
            
            return (
                <div className="current-dash">
                    <h3 className="locale-text">{this.props.location}</h3>
                    <h3 className="temp-text" style={tempColor}><span className="icon"></span><img src={tempImage} width="50px" height="50px"></img>{tempReading}&#176;F</h3>
                    <div className="reading-dash">
                        <h3 className="press-text">Pressure<br />{pressReading} inHg</h3>
                        <h3 className="humid-text">Humidity<br />{humidReading}%</h3>
                        <h3 className="wind-text">Wind Speed<br /><span>{dirReading}</span> {spdReading} mph</h3>
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