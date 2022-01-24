import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import avatarProfile from '../images/avatar.jpg';
import { useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history'

// components
import '../css/ForgotPassword.css';
import { AxiosInstance } from '../axios/AxiosInstance';
import ErrorHanlde from './ErrorHanlde';


const ForgotPassword = () => {
    const navigate = useNavigate()
    const history = createBrowserHistory()

    const [email, setEmail] = useState()
    const [errorRes, setErrorRes] = useState()

    const formHandle = async (e) => {
        e.preventDefault()
        try {
            const res = await AxiosInstance.post('/api/forgot/password', { email })
            setEmail()
            setErrorRes(res.data.message)

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
                <h2 className='forgot-password-h2'>Forgot Password?</h2>
                <Avatar alt="profile" src={avatarProfile} style={{ width: '120px', height: '120px' }} />
                <p className='forgot-password-p'>Enter the email address associated with your account</p>
                <form className='forgot-password-form' onSubmit={formHandle}>
                    <input type="text" placeholder='Enter Email Address' value={email || ''} onChange={(e) => setEmail(e.target.value)} />
                    <button>Send</button>
                </form>
            </div>

            {/*  showing error on display */}
            {
                errorRes && <ErrorHanlde errorRes={errorRes} setErrorRes={setErrorRes} />
            }
        </>
    )
}

export default ForgotPassword
