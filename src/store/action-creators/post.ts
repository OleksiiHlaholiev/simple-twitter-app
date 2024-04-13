import {PostAction, PostActionTypes} from "../../dataTypes/dataTypes";
import {Dispatch} from "redux";
import {asyncRequest} from "../../services/api";
import {POSTS_LIMIT, URL_API_BASE} from "../../constants";

//TODO: check the logic with store
export const fetchPosts = (page: number = 0) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({type: PostActionTypes.FETCH_POSTS});
            const skip = page * POSTS_LIMIT;
            const requestURL = `${URL_API_BASE}/posts?limit=${POSTS_LIMIT}&skip=${skip}`;
            const response = await asyncRequest(requestURL);

            dispatch({type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: response});
        } catch (error: any) {
            dispatch({
                type: PostActionTypes.FETCH_POSTS_ERROR,
                payload: error.message,
            })
        }
    }
}

export function setPostsPage(page: number): PostAction {
    return {type: PostActionTypes.SET_POSTS_PAGE, payload: page}
}
