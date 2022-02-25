import React, { useState, useEffect } from 'react';
import { IoMailOutline } from 'react-icons/io5';
import { VscLock } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import { createBrowserHistory } from 'history'

// components
import '../css/Signup.css';
import { AxiosInstance } from '../axios/AxiosInstance';
import ErrorHanlde from './ErrorHanlde';


/* eslint-disable */

const Login = () => {
    const navigate = useNavigate()
    const history = createBrowserHistory()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorRes, setErrorRes] = useState()


    const loginFnc = async () => {
        if (!email || !password) {
            setErrorRes("Please Fill The Form")
            return
        } else if (!validator.isEmail(email)) {
            setErrorRes("Please Enter Correct Email")
            return
        }

        try {
            const res = await AxiosInstance.post('/api/user/login', { email, password })
            localStorage.setItem('user', JSON.stringify(res.data.user))

            history.replace('/')
            return navigate(-1)

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
            <div className='signup-main-div'>
                <h2>Sign in</h2>
                <form className='signup-form'>
                    <div className='signup-input'>
                        <IoMailOutline style={{ fontSize: '20px' }} />
                        <input type="email" placeholder='Email' value={email || ''} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className='signup-input' >
                        <VscLock style={{ fontSize: '20px' }} />
                        <input type="password" placeholder='Password' value={password || ''} onChange={(e) => setPassword(e.target.value)} required />
                    </div >
                </form >
                <div className='signup-forgot-password'>
                    <Link to="/account/forgot-password">Forgot password</Link>
                </div>
                <div className="signup-button">
                    <button onClick={loginFnc}>Login</button>
                    <span style={{ marginTop: '30px', marginBottom: '10px' }}>Or</span>
                    <span>Don't have account ? <Link to="/account/signup" style={{ color: 'blue' }}>Signup</Link></span>
                </div>
            </div >

            {/*  showing error on display */}
            {
                errorRes && <ErrorHanlde errorRes={errorRes} setErrorRes={setErrorRes} />
            }
        </>
    )
}

export default Login
