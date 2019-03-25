import React from 'react';

// This is a stateless functional component that is used to 
// display information for each member of our group.

export const aboutUsInfo = [
    ["Roger Huang", "Project Manager | Database Administrator", "/images/roger.png", "#F95F52", "Roger is known for his 9 consecutive 1st place finishes at the \
                                Daytona 500. He also enjoys bad movie spin-offs."],
    ["Austin Pickart", "Lead Programmer | Git Repo Manager", "/images/neo.gif", "#37F476", "Austin learned programming from a Monk at a Temple \
                                in Eastern Asia. Actually this may or may not be true, it could've been a \
                                temple elsewhere."],
    ["Kody Looper", "Hardware Engineer | Arduino Programmer", "/images/swanson.gif", "#37E3F4", "Kody enjoys long afternoon strolls on the range, and is an \
                                avid part time underwater-basket weaver."],
    ["Andrew Erickson", "Front-End Designer | Technical Writer", "/images/obi.gif", "#F2B622", "Andrew enjoys bad puns, playing with his dogs, and \
                                memes. What's more to say?"]
]

export const AboutUs = () => ( 
    aboutUsInfo.map((info) => (   
        <div key={info[0]} className="person">
        <img src={info[2]} width="200px"></img>
            <h1 style={{color: info[3]}}>{info[0]}</h1>
            <h2>{info[1]}</h2>
            <p>{info[4]}</p>
        </div>
    ))   
);

export default AboutUs;