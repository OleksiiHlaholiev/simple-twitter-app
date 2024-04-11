import React, {useEffect, useState} from "react";
import {IUser} from "../../dataTypes/dataTypes";
import {getLoggedUserInfo} from "../../services/api";
import {showNotificationError} from "../../helpers/notifications";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export const SettingsPage = () => {
    const [data, setData] = useState<IUser | null>(null);
    const [isProcess, setIsProcess] = useState<boolean>(false);

    const loadData = async () => {
        try {
            const data = await getLoggedUserInfo();
            console.log('Current user: ', data);
            setData(data);
        } catch (error: any) {
            console.error(error);
            const errorMsg = error?.message as string;
            showNotificationError(errorMsg);
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

    return (
        <>
            {isProcess ? (<ProgressBar/>) : ''}

            <h2>Settings Page</h2>
        </>
    )
};