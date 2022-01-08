import React, { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { IoMailOutline } from 'react-icons/io5';
import { VscLock } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';


// components
import '../css/Signup.css';
import { AxiosInstance } from '../axios/AxiosInstance';
import ErrorHanlde from './ErrorHanlde';


const Signup = () => {
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorRes, setErrorRes] = useState()

    const signupFnc = async () => {
        if (!name || !email || !password) {
            setErrorRes("Please Fill The Form")
            return
        } else if (!validator.isEmail(email)) {
            setErrorRes("Please Enter Correct Email")
            return
        }

        try {
            const res = await AxiosInstance.post('/api/user/signup', { name, email, password })
            localStorage.setItem('user', JSON.stringify(res.data.user))

            return navigate(-1)

        } catch (error) {
            error.response &&
                setErrorRes(error.response.data.error)
        }
    }

    return (
        <>
            <div className='signup-main-div'>
                <h2>Create Account</h2>
                <form className='signup-form'>
                    <div className='signup-input'>
                        <BsPerson style={{ fontSize: '20px' }} />
                        <input type="text" placeholder='Name' value={name || ''} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className='signup-input'>
                        <IoMailOutline style={{ fontSize: '20px' }} />
                        <input type="email" placeholder='Email' value={email || ''} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='signup-input' >
                        <VscLock style={{ fontSize: '20px' }} />
                        <input type="password" placeholder='Password' value={password || ''} onChange={(e) => setPassword(e.target.value)} />
                    </div >
                </form >
                <div className="signup-button">
                    <button onClick={signupFnc}>Signup</button>
                    <span style={{ marginTop: '30px', marginBottom: '10px' }}>Or</span>
                    <span>Already a user ? <Link to="/login" style={{ color: 'blue' }}>Login</Link></span>
                </div>
                <div className="signup-with-others">

                </div>
            </div >


            {/*  showing error on display */}
            {
                errorRes && <ErrorHanlde errorRes={errorRes} setErrorRes={setErrorRes} />
            }
        </>
    )
}

export default Signup
