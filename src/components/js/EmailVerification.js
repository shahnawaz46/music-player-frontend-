import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// components
import '../css/EmailVerification.css';
import { AxiosInstance } from '../axios/AxiosInstance';
import ErrorHanlde from './ErrorHanlde';


const EmailVerification = () => {
    const navigate = useNavigate()

    const [otp, setOtp] = useState()
    const [errorRes, setErrorRes] = useState()

    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            const _id = JSON.parse(localStorage.getItem('_id'))
            const data = {
                otp,
                _id
            }
            const res = await AxiosInstance.post('/api/email/verification', data)
            localStorage.clear('_id')
            localStorage.setItem("user", JSON.stringify(res.data.user))

            return navigate(-1, {replace:true})

        } catch (error) {
            error.response &&
                setErrorRes(error.response.data.error)
        }

    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            return navigate('/', {replace:true})
        }
    }, [])

    return (
        <>
            <div className='email-verification-main-div'>
                <h3>
                    verification code has sent on your gmail please enter
                </h3>
                <form className='email-verification-form' onSubmit={formSubmit}>
                    <input type="text" maxLength={4} placeholder='Enter Otp' onChange={(e) => setOtp(e.target.value)} />
                    <button>Submit</button>
                </form>
            </div>

            {/*  showing error on display */}
            {
                errorRes && <ErrorHanlde errorRes={errorRes} setErrorRes={setErrorRes} />
            }
        </>
    )
}

export default EmailVerification
