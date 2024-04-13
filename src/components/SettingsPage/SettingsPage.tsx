import React, {FC, useEffect, useState} from "react";
import {IUser} from "../../types/user";
import {getLoggedUserInfo} from "../../services/api";
import {ProgressBar} from "../ProgressBar/ProgressBar";
import {Button} from "@mui/material";
import {ROUTES_PATH} from "../../constants";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {resetLoginUserState} from "../../store/action-creators/user";
import {resetPostsState} from "../../store/action-creators/post";

export const SettingsPage: FC = () => {
    const [data, setData] = useState<IUser | null>(null);
    const [isProcess, setIsProcess] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isLoggedIn, isLoading} = useTypedSelector(state => state.user);

    const renderCondition = !isProcess && data !== null;

    const loadData = async () => {
        try {
            const data = await getLoggedUserInfo(user.token);
            console.log('Current user: ', data);
            setData(data);
        } catch (error: any) {
            setData(null);
        }
    };

    useEffect(() => {
        (async () => {
            if (!isProcess) {
                setIsProcess(true);

                await loadData();

                setIsProcess(false);
            }
        })();
    }, []);

    const onLogoutBtnClick = () => {
        dispatch(resetLoginUserState());
        dispatch(resetPostsState());
        navigate(`/${ROUTES_PATH.login}`);
    };

    const renderContent = () => {
        return (
            <div className="settings-page">
                {renderCondition ? (
                    <div className="fields-wrapper">
                        <div className="field-cont">
                            <p className="field field-name">UserName:</p>
                            <p className="field field-value">{data?.username}</p>
                        </div>

                        <div className="field-cont">
                            <p className="field field-name">ID:</p>
                            <p className="field field-value">{data?.id}</p>
                        </div>

                        <div className="field-cont img-cont">
                            <img className="poster"
                                 src={data?.image}
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
                    </Button>
                </div>

            </div>
        );
    };

    return (
        <>
            {isProcess ? (<ProgressBar/>) : ''}

            <h2 className="page-name">Settings Page</h2>

            {renderContent()}
        </>
    )
};