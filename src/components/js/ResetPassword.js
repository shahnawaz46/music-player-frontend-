import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import avatarProfile from '../images/avatar.jpg';
import { useNavigate, useParams } from 'react-router-dom';

// components
import '../css/ForgotPassword.css';
import { AxiosInstance } from '../axios/AxiosInstance';
import ErrorHanlde from './ErrorHanlde';


const RestPassword = () => {
    const navigate = useNavigate()
    const { token } = useParams()

    const [password, setPassword] = useState()
    const [errorRes, setErrorRes] = useState()

    const restPasswordForm = async (e) => {
        e.preventDefault()
        try {
            const res = await AxiosInstance.post('/api/reset/password', { token, password })

            setErrorRes(res.data.message)
            setPassword()

            setTimeout(() => {
                return navigate('/account/login', {replace:true})
            }, 2000)

        } catch (error) {
            error.response &&
                setErrorRes(error.response.data.error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            return navigate('/',{replace:true})
        }
    }, [])

    return (
        <>
            <div className='forgot-password-main-div'>
                <h2 className='forgot-password-h2'>Enter New Password</h2>
                <Avatar alt="profile" src={avatarProfile} style={{ width: '120px', height: '120px' }} />
                <p className='forgot-password-p'>Try to use atleast 1 number and 1 symbol in your password</p>
                <form className='forgot-password-form' onSubmit={restPasswordForm}>
                    <input type="password" placeholder='Enter new password' value={password || ''} onChange={(e) => setPassword(e.target.value)} required />
                    <button>Save Password</button>
                </form>
            </div>

            {/*  showing error on display */}
            {
                errorRes && <ErrorHanlde errorRes={errorRes} setErrorRes={setErrorRes} />
            }
        </>
    )
}

export default RestPassword
