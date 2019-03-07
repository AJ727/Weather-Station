import React from 'react';


export const AboutUs = (props) => (

            <div className="person">
                <img src={props.image} width="200px"></img>
                    <h1 style={{color: props.color}}>{props.name}</h1>
                    <p>{props.bio}</p>
            </div>

);

export default AboutUs;