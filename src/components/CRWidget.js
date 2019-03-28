import React from 'react';
import DashLabel from './DashLabel';

class CRWidget extends React.Component {
    state = {}

    render() {

        return (
            <div className="show-for-desktop">
                <button className="sidebox-button">Current<br></br>Readings</button>
                <div className="sidebox">
                    <DashLabel location={"Brooksville, FL"} 
                        tempData={this.props.tempData}
                        humidData={this.props.humidData}
                        pressData={this.props.pressData}
                        curWinDir={this.props.curWinDir}
                        spdData={this.props.spdData}
                    />
                </div>
            </div>
        );
    }
}

export default CRWidget;