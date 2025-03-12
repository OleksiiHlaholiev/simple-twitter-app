import React, {FC, useEffect} from "react";
import {ProgressBar} from "../../components";
import {Button} from "@mui/material";
import {useTypedSelector, useUser} from "../../hooks";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import LogoutIcon from '@mui/icons-material/Logout';


export const SettingsPage: FC = () => {
    const {user, isLoading} = useTypedSelector(state => state.user);
    const {onUpdateUserDataHandler, onLogoutHandler} = useUser();

    const renderCondition = user !== null;

    useEffect(() => {
        // load data if extra user info is absent
        if (!isLoading && !user?.crypto?.coin) {
            onUpdateUserDataHandler();
        }
    }, [])

    const renderContent = () => {
        return (
            <div className="settings-page">
                <div className="btn-cont">
                    <Button className="update-data-btn"
                            variant="contained"
                            color="primary"
                            onClick={() => onUpdateUserDataHandler()}
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

                        <div className="field-cont">
                            <p className="field field-name">Crypto Coin:</p>
                            <p className="field field-value">{user?.crypto?.coin}</p>
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
                    <Button className="log-in-out-btn"
                            variant="contained"
                            color="primary"
                            onClick={() => onLogoutHandler()}
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