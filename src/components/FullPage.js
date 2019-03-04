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
    sectionsColor: ["#dad8d8", "#dad8d8", "#dad8d8", "#dad8d8", "#dad8d8", "#dad8d8",],
    paddingTop: "4.5rem",
    slidesNavigation: true,
    scrollingSpeed: 550
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
                                <TempChart tempData={tempData} />
                                <PressChart pressData={pressData} />
                            </div>
                            <div className="pane-dash">
                                <HumidChart humidData={humidData} />
                                {/* <WindDirChart dirData={dirData} /> */}
                                <WindSpdChart spdData={spdData} />
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
                        
                        {/* <div className="slide">
                            <div className="pane pane-dir">
                                <WindDirChart dirData={dirData} />
                            </div>       
                        </div> */}

                        <div className="slide">
                            <div className="pane">
                                <WindSpdChart spdData={spdData} dirData={dirData} />
                            </div> 
                        </div>

                    </div>
                </div>
            )
        }}
        
    />
);

export default FullPageWrapper;