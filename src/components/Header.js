import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// activeClassName only gets applied when the page is the one clicked on
export const Header = () => (
    <header className="header">
    <div className="content-container">
        <div className="header__content">
            <Link className="header__title" to="/dashboard">
                <h1>WEATHER STATION</h1>
            </Link>
            <button className="button button--link" >Temperature</button>
            <button className="button button--link" >Humidity</button>
            <button className="button button--link" >Pressure</button>
            <button className="button button--link" >Wind Direction</button>
        </div>
    </div>
    </header>
);



export default Header;