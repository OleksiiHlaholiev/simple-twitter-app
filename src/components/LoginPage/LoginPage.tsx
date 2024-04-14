import React, {useEffect, useState} from "react";
import {TextField, Button} from "@mui/material";
import ProgressBar from "../ProgressBar";
import {useNavigate} from "react-router-dom";
import {ROUTES_PATH} from "../../constants";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {makeLoginRequest} from "../../store/action-creators/user";


export const LoginPage = () => {
    const [nickName, setNickName] = useState<string>("");
    const [nickNameError, setNickNameError] = useState<boolean>(false);
    const [isProcess, setIsProcess] = useState<boolean>(false);
    const navigate = useNavigate();

    const {isLoggedIn, isLoading} = useTypedSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/${ROUTES_PATH.home}`);
        }
    }, [isLoggedIn]);

    const launchLoginProcess = () => {
        dispatch(makeLoginRequest(nickName));
    }

    const validateName = (name: string) => {
        return name !== ''; // simple validation
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validateName(nickName)) {
            setNickNameError(false);

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
            {isLoading ? (<ProgressBar/>) : ''}

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