import React from 'react';
import { slide as Menu } from 'react-burger-menu';

// activeClassName only gets applied when the page is the one clicked on
export const Header = () => (
    <header className="header">
        <div className="content-container">

            <div className="header__content">
                <a className="header__title" href="#readings">
                    <img src="/images/logo2.png" height="50px" ></img>
                </a>
                <div className="nav-buttons show-for-desktop">
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
                    <a href="#readings/6">
                        <button className="button button--link">About Us</button>
                    </a>
                </div>
                
                {/* The hamburger menu button with show up once the viewport hits a certain width */}
                <div className="show-for-mobile">
                    <Menu right>
                        <a className="menu-item" href="#readings/1">Temperatures</a>
                        <a className="menu-item" href="#readings/2">Humidity</a>
                        <a className="menu-item" href="#readings/3">Pressure</a>
                        <a className="menu-item" href="#readings/4">Wind Speeds</a>
                        <a className="menu-item" href="#readings/5">Wind Direction</a>
                        <a className="menu-item" href="#readings/6">About Us</a>
                    </Menu>
                </div>
            </div>

        </div>
    </header>
);

export default Header;