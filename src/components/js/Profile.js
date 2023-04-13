import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';

const Profile = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()

        return navigate('/',{replace:true})
    }

    return (
        <div>
            <div className="profile-pic-name">
                <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80" alt="" />
                <div className="profile-name">
                    <span style={{ fontSize: '20px', textTransform: 'capitalize' }}>{JSON.parse(localStorage.getItem('user'))?.name}</span>
                    <div className="profile-email-logout">
                        <span>{JSON.parse(localStorage.getItem('user'))?.email}</span>
                        <button onClick={logout} className='profile-button'>logout</button>
                    </div>
                </div>
            </div>

            <div className="profile-favoruite-songs">

            </div>
        </div>
    )
}

export default Profile
