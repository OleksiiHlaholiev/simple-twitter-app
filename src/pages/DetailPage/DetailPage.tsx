import React, {FC, useEffect, useState} from "react";
import {IPost} from "../../types";
import {getPostById} from "../../services/api";
import {ProgressBar} from "../../components";
import {Link, useParams} from "react-router-dom";
import {ROUTES_PATH} from "../../constants";
import {renderTags} from "../../helpers/renderFuncs";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";


export const DetailPage: FC = () => {
    const params = useParams();
    const postId = +(params?.id ?? 0);
    const [data, setData] = useState<IPost | null>(null);
    const [isProcess, setIsProcess] = useState<boolean>(false);

    const loadData = async () => {
        try {
            const data = await getPostById(postId);

            setData(data);
        } catch (error) {
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

    const renderSinglePost = (itemData: IPost | null) => {
        const {body, id, reactions, tags = [], title, userId} = itemData ?? {};
        const isDataNotEmpty = itemData !== null;
        const titleStr = isDataNotEmpty ? 'Post' : 'No Post information';

        const linkPathTo = `/${ROUTES_PATH.home}`;

        return (
            <div className='detail-page loaded'>
                <div className="bg-cont">
                    <div className="posts-wrapper">
                        <h2 className="post-title">{titleStr}</h2>

                        {isDataNotEmpty ? (
                            <>
                                <div className="posts-cont">
                                    <div className="item" key={`post-item-${id}`}>
                                        <div className="info-cont">
                                            <h3 className="name">{title}</h3>
                                            <p>ID: {id}</p>
                                            {renderTags(tags)}
                                            <p>{`Reactions:: likes: ${reactions?.likes} --- dislikes: ${reactions?.dislikes}`}</p>
                                            <p>
                                                Reactions::
                                                <i className="icon icon-like">
                                                    <ThumbUpIcon sx={{color: 'yellow'}}/>
                                                </i> {reactions?.likes}
                                                &nbsp;---&nbsp;
                                                <i className="icon icon-dislike">
                                                    <ThumbDownIcon sx={{color: 'yellow'}}/>
                                                </i> {reactions?.dislikes}
                                            </p>
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
        return renderSinglePost(data);
    };

    return (
        <>
            {isProcess ? (<ProgressBar/>) : ''}

            <h2 className="page-name">Detail Page</h2>

            {renderContent()}
        </>
    )
};
