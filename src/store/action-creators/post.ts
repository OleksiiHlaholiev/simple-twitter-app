import {PostAction, PostActionTypes} from "../../types";
import {Dispatch} from "redux";
import * as api from "../../services/api";
import {POSTS_LIMIT} from "../../constants";

export const fetchPosts = (page: number = 0) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({type: PostActionTypes.FETCH_POSTS});
            const skip = page * POSTS_LIMIT;
            const response = await api.getPosts(skip)
            dispatch({type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: response});
        } catch (error: any) {
            dispatch({
                type: PostActionTypes.FETCH_POSTS_ERROR,
                payload: error.message,
            })
        }
    }
}

export const setPostsPage = (page: number): PostAction => {
    return {type: PostActionTypes.SET_POSTS_PAGE, payload: page}
}

export const resetPostsState = (): PostAction => {
    return {type: PostActionTypes.RESET_POSTS_STATE}
}
