import React, {useEffect, useState} from "react";
import {getPosts} from "../../services/api";
import {DESCRIPTION_SYMBOLS_QUANTITY, POSTS_LIMIT, ROUTES_PATH} from "../../constants";
import {showNotificationError} from "../../helpers/notifications";
import {IPost} from "../../dataTypes/dataTypes";
import ProgressBar from "../ProgressBar";
import {Link} from "react-router-dom";
import {renderTags} from "../../helpers/renderFuncs";
import InfiniteScroll from "react-infinite-scroll-component";

export const HomePage = () => {
    const [page, setPage] = useState<number>(0);
    const [data, setData] = useState<IPost[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isProcess, setIsProcess] = useState<boolean>(false);

    const loadData = async () => {
        if (isProcess || !hasMore) return;

        setIsProcess(true);

        try {
            const result = await getPosts(page * POSTS_LIMIT);
            console.log('Current post response: ', result);
            setData(prevData => [...prevData, ...result.posts]);
            if (data.length >= result.total) {
                setHasMore(false);
            }
            setPage(prevPage => prevPage + 1);
        } catch (error: any) {
            console.error(error);
            const errorMsg = error?.message as string;
            showNotificationError(errorMsg);
            setData([...data]);
        } finally {
            setIsProcess(false);
        }
    };

    useEffect(() => {
        (async () => {
            await loadData();
        })();
    }, []);

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
                    {renderTags(tags)}
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

                <div className="posts-cont">
                    <InfiniteScroll
                        dataLength={data.length}
                        next={loadData}
                        hasMore={hasMore}
                        loader={<ProgressBar/>}
                        endMessage={
                            <p style={{textAlign: "center"}}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {data?.map((itemData, itemIndex) => renderPostItem(itemData, itemIndex))}
                    </InfiniteScroll>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        return renderPosts(data);
    };

    return (
        <>
            <h2>Home Page</h2>

            {renderContent()}
        </>
    )
}