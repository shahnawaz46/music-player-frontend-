import React, { useState, useEffect, useRef } from 'react';
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';

// components
import '../css/Footer.css';
import { gettingImages, gettingSong } from '../axios/AxiosInstance';


const Footer = ({ songList, currentSongIndex }) => {
    const [currentSongPlaying, setCurrentSongPlaying] = useState(false)
    const [fullHeight, setFullHeight] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)
    const [timer, setTimer] = useState(0)

    const iconStyle = {
        fontSize: '40px',
        cursor: 'pointer',
        color: 'white'
    }

    let audio = useRef(new Audio());
    let timeInterval = useRef()

    const startTimer = () => {
        clearInterval(timeInterval.current)

        timeInterval.current = setInterval(() => {
            setTimer(audio.current.currentTime)
        }, 1000)
    }

    const changeProgressTimer = (e) => {
        setTimer(e.target.value)
        audio.current.currentTime = e.target.value
    }

    const play = (value, index) => {
        if (currentSongPlaying) {
            audio.current.pause()
        }
        const songs = gettingSong(songList.type, value.song_name)
        audio.current = new Audio(songs)
        audio.current.play()
        setCurrentSongPlaying({ ...value, currentTrack: index })

        startTimer()
    }

    const pause = () => {
        audio.current.pause()
        setIsPlaying(false)
    }

    const resume = () => {
        audio.current.play()
        setIsPlaying(true)
    }

    const playNextSong = () => {
        setTimer(0)
        setIsPlaying(true)
        const index = currentSongPlaying.currentTrack === songList.song.length - 1 ? 0 : currentSongPlaying.currentTrack + 1
        play(songList.song[index], index)
    }

    const playPreviousSong = () => {
        setTimer(0)
        setIsPlaying(true)
        const index = currentSongPlaying.currentTrack === 0 ? songList.song.length - 1 : currentSongPlaying.currentTrack - 1
        play(songList.song[index], index)
    }

    useEffect(() => {
        setIsPlaying(true)
        play(songList.song[currentSongIndex], currentSongIndex)
    }, [currentSongIndex])

    useEffect(() => {
        if (fullHeight) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [fullHeight])

    return (
        <div className={fullHeight ? 'footer-main-div fullHeight' : 'footer-main-div'}>
            <div className="footer-up-icon">
                {
                    !fullHeight ?
                        <IoIosArrowUp style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => setFullHeight(true)} /> :
                        <IoIosArrowDown style={{ fontSize: '30px', cursor: 'pointer', color: 'white' }} onClick={() => setFullHeight(false)} />
                }
            </div>
            <div className="footer-song-play-pause">
                {
                    !fullHeight ?
                        <>
                            <h3>{currentSongPlaying?.song_name}</h3>
                            {
                                isPlaying ? <BsPauseCircle style={{ fontSize: '30px', cursor: 'pointer' }} onClick={pause} /> : <BsPlayCircle style={{ fontSize: '30px', cursor: 'pointer' }} onClick={resume} />
                            }
                        </>
                        :
                        <>
                            <div className="footer-full-screen">
                                <div className="footer-song-photo">
                                    <img src={gettingImages(currentSongPlaying?.image)} alt="song" className="footer-avatar" />
                                </div>
                                <div className="footer-song-name">
                                    <span style={{ fontWeight: '500', fontSize: '16px' }}>{currentSongPlaying?.song_name}</span> <br />
                                    <span style={{ fontSize: '14px' }}>{currentSongPlaying?.singer}</span>
                                </div>
                                <div className="footer-song-progress-bar">
                                    <input type="range" min={0} max={audio.current.duration || 0} value={timer} onChange={(e) => changeProgressTimer(e)} />
                                    <div className="footer-song-time">
                                        <span style={{ marginLeft: '15px' }}>{timer !== 0 ? new Date(timer * 1000).toISOString().substr(14, 5) : '00:00'}</span>
                                        <span style={{ marginRight: '15px' }}>{timer !== 0 ? new Date(audio.current.duration * 1000).toISOString().substr(14, 5) : '00:00'}</span>
                                    </div>
                                </div>
                                <div className="footer-song-play-icons">
                                    <MdSkipPrevious style={iconStyle} onClick={playPreviousSong} />
                                    {
                                        isPlaying ? <BsPauseCircle style={iconStyle} onClick={pause} /> : <BsPlayCircle style={iconStyle} onClick={resume} />
                                    }
                                    <MdSkipNext style={iconStyle} onClick={playNextSong} />
                                </div>
                            </div>
                        </>
                }

            </div>
        </div >
    )
}

export default Footer;
