import {PostAction, PostActionTypes, PostState} from "../../types";

const initialState: PostState = {
    posts: [],
    page: 0,
    hasMore: true,
    isLoading: false,
    error: null,
};

export const postReducer = (state = initialState, action: PostAction): PostState => {
    switch (action.type) {
        case PostActionTypes.FETCH_POSTS: {
            return {...state, isLoading: true, error: null};
        }
        case PostActionTypes.FETCH_POSTS_SUCCESS: {
            const updatedPosts = [...state.posts, ...action.payload.posts];
            const hasMore = updatedPosts.length < action.payload.total;

            return {...state, isLoading: false, error: null, hasMore, posts: updatedPosts};
        }
        case PostActionTypes.FETCH_POSTS_ERROR: {
            return {...state, isLoading: false, error: action.payload, posts: []};
        }
        case PostActionTypes.SET_POSTS_PAGE: {
            return {...state, page: action.payload};
        }
        case PostActionTypes.RESET_POSTS_STATE: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};
