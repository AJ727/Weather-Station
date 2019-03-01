import React from 'react';
import TempChart from './TempChart';
import HumidChart from './HumidChart';
import PressChart from './PressChart';
import WindSpdChart from './WindSpdChart';
import WindDirChart from './WindDirChart';
import ReactFullpage from '@fullpage/react-fullpage';

export const fullpageOptions = {
    anchors: [
        "dashPage", "tempPage", "humidPage", "pressPage", "dirPage", "spdPage"
    ],
    sectionsColor: ["#dad8d8", "#dad8d8", "#dad8d8", "#dad8d8", "#dad8d8", "#dad8d8",],
    callbacks: ["onLeave"],
    scrollOverflow: false,
    menu: '#kaar-Menu',
    navigation: true,
    navigationTooltips: ["Dashboard", "Temps", "Humidity", "Pressures", "Directions", "Speeds"],
    navigationPosition: "left",
    showActiveTooltip: true,
    scrollingSpeed: 800,
    paddingTop: "2rem",
    normalScrollElementTouchThreshold: 500,
    //fixedElements: '.VictoryContainer',
    normalScrollElements: '.pane > div, .pane, .VictoryContainer'
}

const FullPageWrapper = ({ tempData, humidData, pressData, dirData, spdData }) => (
    <ReactFullpage
        {...fullpageOptions}
        render={({state, fullpageApi}) => {
            return (
                <div id="fullpage-wrapper">
                    
                    <div className="section">
                        <div className="pane-dash">
                            <TempChart tempData={tempData} />
                            <PressChart pressData={pressData} />
                        </div>
                        <div className="pane-dash">
                            <HumidChart humidData={humidData} />
                            <WindDirChart dirData={dirData} />
                            <WindSpdChart spdData={spdData} />
                        </div>               
                    </div>

                    <div className="section">
                        <div className="pane">
                            <TempChart tempData={tempData} />
                        </div>
                    </div>

                    <div className="section">
                        <div className="pane">
                            <HumidChart humidData={humidData} />
                        </div>        
                    </div>
                    
                    <div className="section">
                        <div className="pane">
                            <PressChart pressData={pressData} />
                        </div>              
                    </div>
                    
                    <div className="section">
                        <div className="pane">
                            <WindDirChart dirData={dirData} />
                        </div>       
                    </div>

                    <div className="section">
                        <div className="pane">
                            <WindSpdChart spdData={spdData} />
                        </div> 
                    </div>
                    
                </div>
            )
        }}
        
    />
);

export default FullPageWrapper;