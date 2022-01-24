import React, { useEffect } from 'react';
import '../css/ErrorHanlde.css';
import { Alert } from "@mui/material";

const ErrorHanlde = ({ errorRes, setErrorRes }) => {

    useEffect(() => {

        const time = setTimeout(() => {
            setErrorRes()
        }, 2000)

        return () => {
            clearTimeout(time)
        }

    }, [errorRes])

    return (
        <div className='errorhandle-main-div'>
            {
                errorRes && <Alert >{errorRes}</Alert>
            }
        </div>
    )
}

export default ErrorHanlde
