export interface IPost {
    body: string;
    id: number;
    reactions: number;
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
    FetchPostsSuccessAction |
    FetchPostsErrorAction |
    SetPostsPageAction;

/* ------------------- Redux types for Post end ------------------- */
