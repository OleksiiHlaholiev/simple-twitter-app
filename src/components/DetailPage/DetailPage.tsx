import React, {useEffect, useState} from "react";
import {IPost} from "../../dataTypes/dataTypes";
import {getPostById} from "../../services/api";
import {showNotificationError} from "../../helpers/notifications";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import {Link, useParams} from "react-router-dom";
import {ROUTES_PATH} from "../../constants";
import {renderTags} from "../../helpers/renderFuncs";

export const DetailPage = () => {
    const params = useParams();
    const postId = +(params?.id ?? 0);
    const [data, setData] = useState<IPost | null>(null);
    const [isProcess, setIsProcess] = useState<boolean>(false);

    const renderCondition = !isProcess && data;

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

    const renderSinglePost = (itemData: IPost) => {
        const {body, id, reactions, tags, title, userId} = itemData;
        const isDataNotEmpty = itemData !== null;
        const titleStr = isDataNotEmpty ? 'Post' : 'No Post information';

        const linkPathTo = `/${ROUTES_PATH.home}`;

        return (
            <div className='detail-page loaded'>
                <div className="bg-cont">
                    <div className="posts-wrapper">
                        <h2 className="post-title page-name">{titleStr}</h2>

                        {isDataNotEmpty ? (
                            <>
                                <div className="posts-cont">
                                    <div className="item" key={`post-item-${id}`}>
                                        <div className="info-cont">
                                            <h3 className="name">{title}</h3>
                                            <p>ID: {id}</p>
                                            {renderTags(tags)}
                                            <p>{`Reactions: ${reactions}`}</p>
                                            <p className="description">{body}</p>
                                            <p className="detail-info">
                                                <Link to={linkPathTo} className="link go-to-main-btn">HOME</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : ''}
                    </div>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        return renderCondition ? (renderSinglePost(data)) : '';
    };

    return (
        <>
            {isProcess ? (<ProgressBar/>) : ''}

            <h2>Detail Page</h2>

            {renderContent()}
        </>
    )
};