import {UserAction, UserActionTypes, UserSessionState} from "../../types/user";

const initialState: UserSessionState = {
    user: {
        id: 0,
        username: '',
        token: '',
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
        default: {
            return state;
        }
    }
};
