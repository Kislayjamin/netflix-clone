import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file for styling
import Netflix from './Netflix.webp'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
            <div className="navbar-brand">
                <img
                    className="navbar-logo"
                    src={Netflix}
                    alt="Netflix Logo"
                />
            </div>
            <div className="className">
                <div className="navbar-menu">
                    <ul className="navbar-links">
                        <li className="navbar-link">Home</li>
                        <li className="navbar-link">TV Shows</li>
                        <li className="navbar-link">Movies</li>
                        <li className="navbar-link">My List</li>
                    </ul>
                    <button className="navbar-toggle" onClick={toggleNavbar}>
                        <span className="navbar-toggle-icon"></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
