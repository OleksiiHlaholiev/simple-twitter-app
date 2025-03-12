import React, {useEffect, useState} from "react";
import {TextField, Button} from "@mui/material";
import {ProgressBar} from "../../components";
import {useNavigate} from "react-router-dom";
import {ROUTES_PATH} from "../../constants";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks";
import {makeLoginRequest} from "../../store/action-creators/user";
import {IUserWithToken} from "../../types/user";
import {setLocalStorageUser} from "../../helpers/localStorageFuncs";
import LoginIcon from '@mui/icons-material/Login';


export const LoginPage = () => {
    const [userName, setUserName] = useState<string>("test");
    const [userNameError, setUserNameError] = useState<boolean>(false);
    const [userPassword, setUserPassword] = useState<string>("testPass123");
    const [userPasswordError, setUserPasswordError] = useState<boolean>(false);
    const navigate = useNavigate();

    const {isLoggedIn, isLoading} = useTypedSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/${ROUTES_PATH.home}`);
        }
    }, [isLoggedIn]);

    const successCallBack = (user: IUserWithToken) => {
        setLocalStorageUser(user);
    };

    const launchLoginProcess = () => {
        dispatch(makeLoginRequest(userName, userPassword, successCallBack));
    }

    const validateField = (fieldName: string) => {
        return fieldName !== ''; // simple validation
    };

    const fullValidation = () => {
        const checkUserName = validateField(userName);
        const checkUserPassword = validateField(userPassword);

        setUserNameError(!checkUserName);
        setUserPasswordError(!checkUserPassword);

        return checkUserName && checkUserPassword;
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!fullValidation()) return

        launchLoginProcess();
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
                    label="User name"
                    onChange={e => setUserName(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={userName}
                    error={userNameError}
                />

                <TextField
                    label="User password"
                    onChange={e => setUserPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    sx={{mb: 3}}
                    fullWidth
                    value={userPassword}
                    error={userPasswordError}
                />

                <Button className="log-in-out-btn"
                        variant="contained"
                        color="primary"
                        type="submit"
                >
                    Login
                    <i className="icon icon-login">
                        <LoginIcon/>
                    </i>
                </Button>
            </form>
        </>
    );
};
