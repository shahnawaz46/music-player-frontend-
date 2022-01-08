import React, { useEffect } from 'react';
import '../css/ErrorHanlde.css';
import { Alert } from "@mui/material";

const ErrorHanlde = ({ errorRes, setErrorRes }) => {

    useEffect(() => {

        setTimeout(() => {
            setErrorRes()
        }, 2000)

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
