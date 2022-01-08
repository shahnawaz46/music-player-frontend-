import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';

// components
import '../css/SongsList.css';
import { AxiosInstance, gettingImages } from '../axios/AxiosInstance';

const SongsList = ({ setCurrentSongIndex, songList, setSongList }) => {
    const { slug } = useParams()
    const [renderPage, setRenderPage] = useState(false)

    useEffect(() => {
        const gettingSongDataFromApi = async () => {
            const res = await AxiosInstance.post('/api/songs', { slug })
            setSongList(res.data[0])
            setRenderPage(true)
        }
        gettingSongDataFromApi()
    }, [slug])

    return (
        <div className='songslist-main-div'>
            <h2>All Songs</h2>
            {
                renderPage ?
                    songList.song.map((value, index) =>
                        <div className="songslist-songs" key={index}>
                            <Avatar src={gettingImages(value.image)} className="songslist-avatar" />
                            <div className="songslist-song-name-and-singer">
                                <span style={{ fontWeight: '500', fontSize: '15px', cursor: 'pointer', textTransform: 'lowercase' }} onClick={() => setCurrentSongIndex(index)} >{value.song_name}</span> <br />
                                <span style={{ fontSize: '15px' }}>{value.singer}</span>
                            </div>
                        </div>)
                    :
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                        <CircularProgress />
                    </div>
            }
        </div >
    )
}

export default SongsList
