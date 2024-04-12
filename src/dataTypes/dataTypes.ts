export interface IUser {
    id: number;
    username: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    image?: string;
}

export interface IUserWithToken extends  IUser {
    token: string;
}

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

/* ------------------- Redux types start ------------------- */

export enum PostActionTypes {
    FETCH_POSTS = "FETCH_POSTS",
    FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS",
    FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR",
}

export interface PostState {
    posts: IPost[];
    isLoading: boolean;
    error: null | string;
}

interface FetchPostsAction {
    type: PostActionTypes.FETCH_POSTS;
}

interface FetchPostsSuccessAction {
    type: PostActionTypes.FETCH_POSTS_SUCCESS;
    payload: IPost[];
}

interface FetchPostsErrorAction {
    type: PostActionTypes.FETCH_POSTS_ERROR;
    payload: string;
}

export type PostAction = FetchPostsAction | FetchPostsSuccessAction | FetchPostsErrorAction;

/* ------------------- Redux types end ------------------- */
