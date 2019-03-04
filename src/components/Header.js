import React from 'react';
import { Link } from 'react-router-dom';

// activeClassName only gets applied when the page is the one clicked on
export const Header = () => (
    <header className="header">
    <div className="content-container">
        <div className="header__content">
            <a className="header__title" href="#readings">
                <h1>WEATHER STATION</h1>
            </a>
            <div className="nav-buttons">
                <a href="#readings/1">
                    <button className="button button--link">Temperatures</button>
                </a>
                <a href="#readings/2">
                    <button className="button button--link">Humidity</button>
                </a>
                <a href="#readings/3">
                    <button className="button button--link">Pressure</button>
                </a>
                <a href="#readings/4">
                    <button className="button button--link">Wind Speeds</button>
                </a>
                <a href="#readings/5">
                    <button className="button button--link">Wind Direction</button>
                </a>
            </div>
        </div>
    </div>
    </header>
);

export default Header;