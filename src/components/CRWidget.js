import React from 'react';
import DashLabel from './DashLabel';

class CRWidget extends React.Component {
    state = {}

    render() {

        return (
            <div className="show-for-desktop">
                <div className="tooltip">Current<br></br>Readings
                    <div className="left">
                        <DashLabel location={"Brooksville, FL"} 
                            tempData={this.props.tempData}
                            humidData={this.props.humidData}
                            pressData={this.props.pressData}
                            curWinDir={this.props.curWinDir}
                            spdData={this.props.spdData}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CRWidget;