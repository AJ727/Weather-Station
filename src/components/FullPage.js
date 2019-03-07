import React from 'react';
import TempChart from './TempChart';
import HumidChart from './HumidChart';
import PressChart from './PressChart';
import WindSpdChart from './WindSpdChart';
import WindDirChart from './WindDirChart';
import ReactFullpage from '@fullpage/react-fullpage';

export const fullpageOptions = {
    anchors: [
        "readings"
    ],
    sectionsColor: ["#faf8f8", "#faf8f8", "#faf8f8", "#faf8f8", "#faf8f8", "#faf8f8"],
    paddingTop: "5rem",
    slidesNavigation: true,
    scrollingSpeed: 400
}

const FullPageWrapper = ({ tempData, humidData, pressData, dirData, spdData }) => (
    <ReactFullpage
        {...fullpageOptions}
        render={({state, fullpageApi}) => {
            return (
                <div className="fullpage">
                    <div className="section">

                        <div className="slide">
                            <div className="pane-dash">
                                <div className="dash-chart">
                                    <TempChart tempData={tempData} />
                                </div>
                                <div className="dash-chart">
                                    <PressChart pressData={pressData} />
                                </div>
                            </div>
                            <div className="pane-dash">
                                <div className="dash-chart">
                                    <HumidChart humidData={humidData} />
                                </div>
                                <div className="dash-chart">
                                    <WindDirChart className="dir" dirData={dirData} />
                                </div>
                                <div className="dash-chart">
                                    <WindSpdChart spdData={spdData} />
                                </div>
                            </div>               
                        </div>

                        <div className="slide">
                            <div className="pane">
                                <TempChart tempData={tempData} />
                            </div>
                        </div>

                        <div className="slide">
                            <div className="pane">
                                <HumidChart humidData={humidData} />
                            </div>        
                        </div>
                        
                        <div className="slide">
                            <div className="pane">
                                <PressChart pressData={pressData} />
                            </div>              
                        </div>
                        
                        <div className="slide">
                            <div className="pane">
                                <WindSpdChart spdData={spdData} />
                            </div> 
                        </div>

                        <div className="slide">
                            <div className="pane pane-dir">
                                <WindDirChart dirData={dirData} />
                            </div>       
                        </div>

                    </div>

                    <div className="Section">
                        Hello
                    </div>

                </div>
            )
        }}
        
    />
);

export default FullPageWrapper;