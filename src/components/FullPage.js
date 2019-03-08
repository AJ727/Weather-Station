import React from 'react';
import TempChart from './TempChart';
import HumidChart from './HumidChart';
import PressChart from './PressChart';
import WindSpdChart from './WindSpdChart';
import WindDirChart from './WindDirChart';
import ReactFullpage from '@fullpage/react-fullpage';
import AboutUs from './AboutUs';
import DashLabel from './DashLabel';

export const fullpageOptions = {
    anchors: ["readings"],
    sectionsColor: ["#faf8f8"],
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
                                <div className="dash-chart show-for-desktop">
                                    <TempChart tempData={tempData} />
                                </div>
                                
                                <DashLabel location={"Brooksville, FL"} tempData={tempData} humidData={humidData} pressData={pressData} dirData={dirData} spdData={spdData}/>

                                <div className="dash-chart show-for-desktop">
                                    <PressChart pressData={pressData} />
                                </div>
                            </div>

                            <div className="pane-dash">
                                <div className="dash-chart show-for-desktop">
                                    <HumidChart humidData={humidData} />
                                </div>
                                <div className="dash-chart show-for-desktop">
                                    <WindDirChart className="dir" dirData={dirData} />
                                </div>
                                <div className="dash-chart show-for-desktop">
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

                        <div className="slide">
                            <h2>Learn about the creators!</h2>
                            <div className="pane-about">
                                <AboutUs 
                                    name={"Roger Huang"} 
                                    image={"/images/obi.gif"}
                                    color={"#F95F52"}
                                    bio={"Roger is known for his 9 consecutive 1st place finishes at the \
                                    Daytona 500. He also enjoys bad movie spin-offs."}
                                />
                                <AboutUs 
                                    name={"Austin Pickart"} 
                                    image={"/images/neo.gif"}
                                    color={"#37F476"}
                                    bio={"Austin learned programming from a Monk at a Temple \
                                    in Eastern Asia. Note: This may or may not be true, it could've been a \
                                    temple elsewhere."}
                                />
                                <AboutUs 
                                    name={"Kody \"Krash\" Looper"} 
                                    image={"/images/crash.gif"}
                                    color={"#37E3F4"}
                                    bio={"Kody enjoys long afternoon strolls on the range, and is an \
                                    an avid part time underwater-basket weaver."}
                                />
                                <AboutUs 
                                    name={"Andrew Erickson"} 
                                    image={"/images/type.gif"}
                                    color={"#F2B622"}
                                    bio={"Andrew enjoys bad puns. What's more to say?"}
                                />
                            </div>       
                        </div>

                    </div>

                </div>
            )
        }}
        
    />
);

export default FullPageWrapper;