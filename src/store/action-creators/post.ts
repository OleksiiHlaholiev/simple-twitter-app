import {PostAction, PostActionTypes} from "../../dataTypes/dataTypes";
import {Dispatch} from "redux";
import { asyncRequest } from "../../services/api";
import {POSTS_LIMIT, URL_API_BASE} from "../../constants";

//TODO: the logic with store
export const fetchPosts = (skip: number = 0) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({type: PostActionTypes.FETCH_POSTS});
            const requestURL = `${URL_API_BASE}/posts?limit=${POSTS_LIMIT}&skip=${skip}`;
            const response = await asyncRequest(requestURL);

            dispatch({type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: response.posts});
        } catch (e) {
            dispatch({
                type: PostActionTypes.FETCH_POSTS_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}
