import React, {useEffect, useState} from "react";
import {IPost} from "../../dataTypes/dataTypes";
import {getPostById} from "../../services/api";
import {showNotificationError} from "../../helpers/notifications";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export const DetailPage = () => {
    const postId = 1; //TODO: the logic
    const [data, setData] = useState<IPost | null>(null);
    const [isProcess, setIsProcess] = useState<boolean>(false);

    const loadData = async () => {
        try {
            const data = await getPostById(postId);
            console.log('Current post: ', data);
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
    }, [postId]);

    return (
        <>
            {isProcess ? (<ProgressBar/>) : ''}

            <h2>Detail Page</h2>
        </>
    )
};