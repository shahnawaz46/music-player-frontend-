import React from 'react';
import '../css/Navbar.css';
import { MdPerson } from 'react-icons/md';
import musicLogo from '../images/music_logo.png';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate()

    const checkUserIsLogin = () => {
        if (localStorage.getItem('user')) {
            return navigate('/account/profile')
        } else {
            return navigate('/account/login')
        }
    }

    return (
        <div className="navbar-main-div">
            <div className="navbar-logo-and-name">
                <img src={musicLogo} alt="" className="navbar-logo" />
                <span className='navbar-name'>Music Player</span>
            </div>
            <MdPerson className="navbar-search-icon" style={{ cursor: 'pointer' }} onClick={checkUserIsLogin} />

        </div>
    )
}

export default Navbar;