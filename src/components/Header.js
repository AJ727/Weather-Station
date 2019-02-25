import React from 'react';
import { Link } from 'react-router-dom';

// activeClassName only gets applied when the page is the one clicked on
export const Header = () => (
    <header className="header">
    <div className="content-container">
        <div className="header__content">
            <Link className="header__title" to="/">
                <h1>WEATHER STATION</h1>
            </Link>
            <div className="nav-buttons">
                <Link to="/temps">
                    <button className="button button--link" >Temperature</button>
                </Link>
                <Link to="/humidities">
                    <button className="button button--link" >Humidity</button>
                </Link>
                <Link to="/pressures">
                    <button className="button button--link" >Pressure</button>
                </Link>
                <Link to="/wind_speeds">
                    <button className="button button--link" >Wind Speeds</button>
                </Link>
                <Link to="/wind_dirs">
                    <button className="button button--link" >Wind Direction</button>
                </Link>
            </div>
        </div>
    </div>
    </header>
);



export default Header;