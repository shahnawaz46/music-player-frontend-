import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/js/HomePage';
import SongsList from './components/js/SongsList';
import Footer from './components/js/Footer';
import Signup from './components/js/Signup';
import Login from './components/js/Login';
import Profile from './components/js/Profile';
import EmailVerification from './components/js/EmailVerification';
import ForgotPassword from './components/js/ForgotPassword';
import RestPassword from './components/js/ResetPassword';


function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [songList, setSongList] = useState({})

  return (
    <div className={currentSongIndex !== -1 ? 'homepage-div increasePadding' : 'homepage-div'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path=":slug" element={<SongsList setCurrentSongIndex={setCurrentSongIndex} songList={songList} setSongList={setSongList} />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/signup" element={<Signup />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/email-verification" element={<EmailVerification />} />
          <Route path="/account/forgot-password" element={<ForgotPassword />} />
          <Route path="/account/reset/password/:token" element={<RestPassword />} />
        </Routes>
        {
          currentSongIndex !== -1 && <Footer songList={songList} currentSongIndex={currentSongIndex} />
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
