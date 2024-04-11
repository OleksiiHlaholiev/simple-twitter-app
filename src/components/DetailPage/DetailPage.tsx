import React, {useEffect, useState} from "react";
import {IPost} from "../../dataTypes/dataTypes";
import {getPostById} from "../../services/api";
import {showNotificationError} from "../../helpers/notifications";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import {Link, useParams} from "react-router-dom";
import {ROUTES_PATH} from "../../constants";

export const DetailPage = () => {
    const params = useParams();
    const postId = +(params?.id ?? 0);
    const [data, setData] = useState<IPost | null>(null);
    const [isProcess, setIsProcess] = useState<boolean>(false);

    const renderAndRequestCondition = !isProcess && data;

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

    //TODO: check the data type
    const renderSinglePost = (itemData: any) => {
        const {body, id, reactions, tags, title, userId} = itemData;
        const isDataNotEmpty = itemData !== null;
        const titleStr = isDataNotEmpty ? 'Post' : 'No Post information';

        const linkPathTo = `/${ROUTES_PATH.home}`;

        return (
            <div className="posts-wrapper">
                <h2 className="post-title">{titleStr}</h2>

                {isDataNotEmpty ? (
                    <>
                        <div className="posts-cont">
                            <div className="item" key={`post-item-${id}`}>
                                <div className="info-cont">
                                    <h3 className="name">{title}</h3>
                                    <p>ID: {id}</p>
                                    <p>{`Reactions: ${reactions}`}</p>
                                    <p className="description">{body}</p>
                                    <p className="detail-info">
                                        <Link to={linkPathTo} className="link">Home</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : ''}
            </div>
        );
    };

    const renderContent = () => {
        // TODO: check the render logic
        return renderAndRequestCondition ? (renderSinglePost(data)) : '';
    };

    return (
        <>
            {isProcess ? (<ProgressBar/>) : ''}

            <h2>Detail Page</h2>

            {renderContent()}
        </>
    )
};