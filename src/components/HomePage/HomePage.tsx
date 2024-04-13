import React, {useEffect} from "react";
import {DESCRIPTION_SYMBOLS_QUANTITY, POSTS_LIMIT, ROUTES_PATH} from "../../constants";
import {IPost} from "../../dataTypes/dataTypes";
import ProgressBar from "../ProgressBar";
import {Link} from "react-router-dom";
import {renderTags} from "../../helpers/renderFuncs";
import InfiniteScroll from "react-infinite-scroll-component";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {fetchPosts, setPostsPage} from "../../store/action-creators/post";

export const HomePage = () => {
    //TODO: check the logic with store
    const {posts: data, isLoading, error, page, hasMore} = useTypedSelector(state => state.post);
    const postsDataFromRedux = useTypedSelector(state => state.post);
    console.log('postsDataFromRedux: ', postsDataFromRedux);
    const dispatch = useDispatch();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        if (hasMore && !isLoading) {
            dispatch(fetchPosts(page));
            dispatch(setPostsPage(page + 1));
        }
    };

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
                <h3 className="post-title">{title}</h3>

                {isDataNotEmpty ? (
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
                ) : ''}
            </div>
        );
    };

    const renderContent = () => {
        return renderPosts(data);
    };

    return (
        <>
            <h2 className="page-name">Home Page</h2>

            {renderContent()}

            {isLoading ? (<ProgressBar/>) : ''}
        </>
    )
}