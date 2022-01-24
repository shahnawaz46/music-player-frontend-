import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import avatarProfile from '../images/avatar.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history'

// components
import '../css/ForgotPassword.css';
import { AxiosInstance } from '../axios/AxiosInstance';
import ErrorHanlde from './ErrorHanlde';


const RestPassword = () => {
    const navigate = useNavigate()
    const history = createBrowserHistory()
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
                history.replace('/')
                return navigate('/account/login')
            }, 2000)

        } catch (error) {
            error.response &&
                setErrorRes(error.response.data.error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            history.replace('/')
            return navigate('/')
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
