import React, {useEffect, useState } from "react";
import { getPosts } from "../../services/api";
import {DESCRIPTION_SYMBOLS_QUANTITY, POSTS_LIMIT, ROUTES_PATH} from "../../constants";
import {showNotificationError} from "../../helpers/notifications";
import {IPost} from "../../dataTypes/dataTypes";
import ProgressBar from "../ProgressBar";
import { Link } from "react-router-dom";

export const HomePage = () => {
    const [page, setPage] = useState<number>(0);
    const [data, setData] = useState<IPost[]>([]);
    const [isProcess, setIsProcess] = useState<boolean>(false);

    const renderAndRequestCondition = !isProcess;

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
            if (renderAndRequestCondition) {
                setIsProcess(true);

                await loadData();

                setIsProcess(false);
            }
        })();
    }, [page]);

    const renderPostItem = (itemData: IPost, itemIndex: number) => {
        const {body, id, reactions, tags, title, userId} = itemData;

        const tempDescrStr = body.length > DESCRIPTION_SYMBOLS_QUANTITY ?
            body.slice(0, DESCRIPTION_SYMBOLS_QUANTITY - 3) + '...' : body;

        const linkPathTo = `/${ROUTES_PATH.detail}/${id}`;

        return (
            <div className="item" key={`post-item-${id}`}>
                <div className="info-cont">
                    <Link to={linkPathTo} className="link name">{title}</Link>
                    <p>ID: {id}</p>
                    <p>{`Reactions: ${reactions}`}</p>
                    <p className="description">{tempDescrStr}</p>
                    <p className="detail-info">
                        <Link to={linkPathTo} className="link">Detail</Link>
                    </p>
                </div>
            </div>
        );
    };

    const renderPosts = (data: IPost[]) => {
        const isDataNotEmpty = data && data?.length;
        const title = isDataNotEmpty ? 'Posts' : 'No Posts...';

        return (
            <div className="posts-wrapper">
                <h2 className="post-title">{title}</h2>

                {isDataNotEmpty ? (
                    <>
                        <div className="posts-cont">
                            {data?.map((itemData, itemIndex) => renderPostItem(itemData, itemIndex))}
                        </div>
                    </>
                ) : ''}
            </div>
        );
    };

    const renderContent = () => {
        // TODO: check the render logic
        return renderAndRequestCondition ? (renderPosts(data)) : '';
    };

    return (
        <>
            {isProcess ? (<ProgressBar/>) : ''}

            <h2>Home Page</h2>

            {renderContent()}
        </>
    )
}