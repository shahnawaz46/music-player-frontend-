import React from 'react';
import '../css/MainPage.css';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className='mainpage-main-div'>
            <div className="main-page-sarch-bar">
                <input type="text" placeholder='Search Songs' className='main-page-sarch-input' />
            </div>
            <h1>Play Your Favourite Song Online With Music Player</h1>
            <div className="mainpage-song-type">
                <div className="mainpage-bollywood-song" ><Link to='party-songs'>Party Song</Link></div>
                <div className="mainpage-bollywood-song" ><Link to='romantic-songs'>Romantic Song</Link></div>
                <div className="mainpage-bollywood-song" ><Link to='motivational-songs'>Motivational Song</Link></div>
                <div className="mainpage-bollywood-song" ><Link to='qawwali'>Qawwali</Link></div>
            </div>
        </div>
    )
}

export default MainPage;
