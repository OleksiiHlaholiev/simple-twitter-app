import React, {FC} from "react";
import ProgressBar from "../ProgressBar";
import {Button} from "@mui/material";
import {ROUTES_PATH} from "../../constants";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {fetchLoggedUserInfo, resetLoginUserState} from "../../store/action-creators/user";
import {resetPostsState} from "../../store/action-creators/post";
import {clearLocalStorage} from "../../helpers/localStorageFuncs";

import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import LogoutIcon from '@mui/icons-material/Logout';

export const SettingsPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isLoading} = useTypedSelector(state => state.user);

    const renderCondition = user !== null;

    const onLogoutBtnClick = async () => {
        clearLocalStorage();
        dispatch(resetLoginUserState());
        dispatch(resetPostsState());
        navigate(`/${ROUTES_PATH.login}`);
    };

    const onUpdateUserDataBtnClick = async () => {
        dispatch(fetchLoggedUserInfo(user.token));
    };

    const renderContent = () => {
        return (
            <div className="settings-page">

                <div className="btn-cont">
                    <Button variant="contained"
                            color="primary"
                            onClick={onUpdateUserDataBtnClick}
                    >
                        Update user data from server
                        <i className="icon icon-refresh">
                            <RefreshIcon/>
                        </i>
                    </Button>
                </div>

                {renderCondition ? (
                    <div className="fields-wrapper">
                        <div className="field-cont">
                            <p className="field field-name">UserName:</p>
                            <p className="field field-value">{user?.username}</p>
                        </div>

                        <div className="field-cont">
                            <p className="field field-name">ID:</p>
                            <p className="field field-value">{user?.id}</p>
                        </div>

                        <div className="field-cont img-cont">
                            <LazyLoadImage
                                src={user?.image}
                                height={'100%'}
                                effect="blur"
                                alt="user img"
                            />
                        </div>
                    </div>
                ) : ''}

                <div className="btn-cont">
                    <Button variant="contained"
                            color="primary"
                            onClick={onLogoutBtnClick}
                    >
                        Logout
                        <i className="icon icon-logout">
                            <LogoutIcon/>
                        </i>
                    </Button>
                </div>

            </div>
        );
    };

    return (
        <>
            {isLoading ? (<ProgressBar/>) : ''}

            <h2 className="page-name">Settings Page</h2>

            {renderContent()}
        </>
    )
};