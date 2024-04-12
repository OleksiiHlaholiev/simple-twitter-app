import React, {useState} from "react";
import { TextField, Button } from "@mui/material";
import { makeAuthLoginRequest } from "../../services/api";
import ProgressBar from "../ProgressBar";
import {showNotificationError, showNotificationSuccess} from "../../helpers/notifications";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../../constants";


export const LoginPage = () => {
    const [nickName, setNickName] = useState<string>("");
    const [nickNameError, setNickNameError] = useState<boolean>(false);
    const [isProcess, setIsProcess] = useState<boolean>(false);
    const navigate = useNavigate();

    const launchLoginProcess = async () => {
        try {
            const data = await makeAuthLoginRequest(nickName);
            console.log('Login Success: ', data);
            showNotificationSuccess('Login is successful');
            //TODO: check the redirect to Home page and logic
            localStorage.setItem('token', data.token);
            localStorage.setItem('isAuth', 'true');
            navigate(`/${ROUTES_PATH.home}`);
        } catch (error: any) {
            console.error(error);
            const errorMsg = error?.message as string;
            showNotificationError(errorMsg);
            //setData(null);
        }
    };

    const validateName = (name: string) => {
        return name !== ''; // simple validation
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validateName(nickName)) {
            setNickNameError(false);
            console.log(nickName);
            (async () => {
                if (!isProcess) {
                    setIsProcess(true);

                    await launchLoginProcess();

                    setIsProcess(false);
                }
            })();
        } else {
            setNickNameError(true);
        }
    };

    return (
        <>
            {isProcess ? (<ProgressBar/>) : ''}

            <form autoComplete="off"
                  className="form-cont"
                  noValidate={true}
                  onSubmit={handleFormSubmit}
            >
                <h2 className="page-name">Login Page</h2>
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