import React, {useState} from "react";
import { TextField, Button } from "@mui/material";
import { makeAuthLoginRequest } from "../../services/api";
import ProgressBar from "../ProgressBar";
import {showNotificationError} from "../../helpers/notifications";


export const LoginPage = () => {
    const [nickName, setNickName] = useState("");
    const [nickNameError, setNickNameError] = useState(false);
    const [isProcess, setIsProcess] = useState(false);

    const launchLoginProcess = async () => {
        try {
            const data = await makeAuthLoginRequest(nickName);
            console.log('Success: ', data);
        } catch (error: any) {
            console.error(error);
            const errorMsg = error?.message as string;
            showNotificationError(errorMsg);
            //setData(null);
        }
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setNickNameError(false);

        if (nickName === '') {
            setNickNameError(true);
        }

        if (nickName) {
            console.log(nickName);
            (async () => {
                if (!isProcess) {
                    setIsProcess(true);

                    await launchLoginProcess();

                    setIsProcess(false);
                }
            })();
        }
    };

    return (
        <>
            {isProcess ? (<ProgressBar/>) : ''}

            <form autoComplete="off" noValidate={true} onSubmit={handleFormSubmit}>
                <h2>Login Page</h2>
                <TextField
                    label="Nick name"
                    onChange={e => setNickName(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="nickName"
                    sx={{mb: 3}}
                    fullWidth
                    value={nickName}
                    error={nickNameError}
                />

                <Button variant="contained" color="primary" type="submit">Login</Button>
            </form>
        </>
    );
};