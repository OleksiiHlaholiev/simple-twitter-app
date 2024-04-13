import React, {useEffect, useState} from "react";
import {IUser} from "../../dataTypes/dataTypes";
import {getLoggedUserInfo} from "../../services/api";
import {ProgressBar} from "../ProgressBar/ProgressBar";
import {Button} from "@mui/material";
import {ROUTES_PATH} from "../../constants";
import {useNavigate} from "react-router-dom";

export const SettingsPage = () => {
    const [data, setData] = useState<IUser | null>(null);
    const [isProcess, setIsProcess] = useState<boolean>(false);
    const navigate = useNavigate();

    const renderCondition = !isProcess && data !== null;

    const loadData = async () => {
        try {
            const data = await getLoggedUserInfo();
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
        //TODO: the Logout logic
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        //localStorage.clear();
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