import React from 'react';
import TempChart from './TempChart';
import HumidChart from './HumidChart';
import PressChart from './PressChart';
import WindSpdChart from './WindSpdChart';
import WindDirChart from './WindDirChart';
import ReactFullpage from '@fullpage/react-fullpage';
import AboutUs from './AboutUs';

export const fullpageOptions = {
    anchors: ["readings"],
    sectionsColor: ["#faf8f8"],
    paddingTop: "5rem",
    slidesNavigation: true,
    //scrollingSpeed: 400
    scrollingSpeed: 1000
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
                                {/* <div className="dash-img">
                                    <img src="/images/meme_sun.gif" height="50%" width="50%"></img>
                                </div> */}
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

                        <div className="slide">
                            <h2>Learn about the creators!</h2>
                            <div className="pane-about">
                                <AboutUs 
                                    name={"Roger Huang"} 
                                    image={"/images/meme_sun.gif"}
                                    color={"#F95F52"}
                                    bio={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                                    Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi \
                                    ut aliquip ex ea commodo consequat."}
                                />
                                <AboutUs 
                                    name={"Austin Pickart"} 
                                    image={"/images/meme_sun.gif"}
                                    color={"#37F476"}
                                    bio={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                                    Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi \
                                    ut aliquip ex ea commodo consequat."}
                                />
                                <AboutUs 
                                    name={"Kody Looper"} 
                                    image={"/images/meme_sun.gif"}
                                    color={"#37E3F4"}
                                    bio={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                                    Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi \
                                    ut aliquip ex ea commodo consequat."}
                                />
                                <AboutUs 
                                    name={"Andrew Erickson"} 
                                    image={"/images/meme_sun.gif"}
                                    color={"#F2B622"}
                                    bio={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                                    Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi \
                                    ut aliquip ex ea commodo consequat."}
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