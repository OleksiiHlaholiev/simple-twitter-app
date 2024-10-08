export interface IPost {
    body: string;
    id: number;
    reactions: {
        likes: number;
        dislikes: number;
    };
    tags: string[];
    title: string;
    userId: number;
}

export interface IPostResults {
    total: number;
    skip: number;
    limit: number;
    posts: IPost[];
}

/* ------------------- Redux types for Post start ------------------- */

export enum PostActionTypes {
    FETCH_POSTS = "FETCH_POSTS",
    FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS",
    FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR",
    SET_POSTS_PAGE = "SET_POSTS_PAGE",
    RESET_POSTS_STATE = "RESET_POSTS_STATE",
}

export interface PostState {
    posts: IPost[];
    page: number;
    hasMore: boolean;
    isLoading: boolean;
    error: null | string;
}

interface FetchPostsAction {
    type: PostActionTypes.FETCH_POSTS;
}

interface ResetPostsAction {
    type: PostActionTypes.RESET_POSTS_STATE;
}

interface FetchPostsSuccessAction {
    type: PostActionTypes.FETCH_POSTS_SUCCESS;
    payload: IPostResults;
}

interface FetchPostsErrorAction {
    type: PostActionTypes.FETCH_POSTS_ERROR;
    payload: string;
}

interface SetPostsPageAction {
    type: PostActionTypes.SET_POSTS_PAGE;
    payload: number;
}

export type PostAction =
    FetchPostsAction |
    ResetPostsAction |
    FetchPostsSuccessAction |
    FetchPostsErrorAction |
    SetPostsPageAction;

/* ------------------- Redux types for Post end ------------------- */
