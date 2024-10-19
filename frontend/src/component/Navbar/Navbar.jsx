import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { useAuth } from '../../comtext/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu state
    };

    return (
        <div className='navbar'>
            <div className='logo'>Logo</div>
            <div className={`search ${isMenuOpen ? 'active' : ''}`}>
                <input type="search" placeholder="Search..." />
                <button className='button-navbar'>Search</button>
            </div>
            <div className='menu-button' onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={`button-box ${isMenuOpen ? 'active' : ''}`}>
                {!user ? (
                    <>
                        <Link to="/signup"><button className='button-navbar'>Sign Up</button></Link>
                        <Link to="/login"><button className='button-navbar'>Login</button></Link>
                    </>
                ) : (
                    <>
                        <span>{user.name}</span>
                        <button onClick={logout} className='button-navbar'>Logout</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
