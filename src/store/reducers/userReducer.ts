import { getLocalStorageUser } from "../../helpers/localStorageFuncs";
import {UserAction, UserActionTypes, UserSessionState} from "../../types/user";

const localStorageUser = getLocalStorageUser();

const initialState: UserSessionState = {
    user: localStorageUser ?? {
        id: 0,
        username: '',
        accessToken: '',
        refreshToken: '',
    },
    isLoggedIn: !!localStorageUser?.accessToken ?? false,
    isLoading: false,
    error: null,
};

const resetState: UserSessionState = {
    user: {
        id: 0,
        username: '',
        accessToken: '',
        refreshToken: '',
    },
    isLoggedIn: false,
    isLoading: false,
    error: null,
};

export const userReducer = (state = initialState, action: UserAction): UserSessionState => {
    switch (action.type) {
        case UserActionTypes.LOGIN_USER: {
            return {...state, isLoading: true, error: null};
        }
        case UserActionTypes.LOGIN_USER_SUCCESS: {
            return {...state, isLoading: false, error: null, isLoggedIn: true, user: action.payload};
        }
        case UserActionTypes.LOGIN_USER_ERROR: {
            return {...state, isLoading: false, error: action.payload};
        }

        case UserActionTypes.FETCH_USER: {
            return {...state, isLoading: true, error: null};
        }
        case UserActionTypes.FETCH_USER_SUCCESS: {
            return {...state, isLoading: false, error: null, user: {...state.user, ...action.payload}};
        }
        case UserActionTypes.FETCH_USER_ERROR: {
            return {...state, isLoading: false, error: action.payload};
        }

        case UserActionTypes.REFRESH_USER_TOKEN: {
            return {...state, isLoading: true, error: null};
        }
        case UserActionTypes.REFRESH_USER_TOKEN_SUCCESS: {
            return {...state, isLoading: false, error: null, user: {...state.user, ...action.payload}};
        }
        case UserActionTypes.REFRESH_USER_TOKEN_ERROR: {
            return {...state, isLoading: false, error: action.payload};
        }

        case UserActionTypes.RESET_LOGIN_USER_STATE: {
            return resetState;
        }
        default: {
            return state;
        }
    }
};
