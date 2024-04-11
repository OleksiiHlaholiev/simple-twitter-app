import React, {useEffect, useState } from "react";
import { getPosts } from "../../services/api";
import {POSTS_LIMIT} from "../../constants";
import {showNotificationError} from "../../helpers/notifications";
import {IPost} from "../../dataTypes/dataTypes";
import ProgressBar from "../ProgressBar";

export const HomePage = () => {
    const [page, setPage] = useState<number>(0);
    const [data, setData] = useState<IPost[]>([]);
    const [isProcess, setIsProcess] = useState<boolean>(false);

    const loadData = async () => {
        try {
            const data = await getPosts(page * POSTS_LIMIT);
            console.log('Current posts: ', data.posts);
            setData(data.posts);
        } catch (error: any) {
            console.error(error);
            const errorMsg = error?.message as string;
            showNotificationError(errorMsg);
            setData([]);
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
    }, [page]);

    return (
        <>
            {isProcess ? (<ProgressBar/>) : ''}

            <h2>Home Page</h2>
        </>
    )
}