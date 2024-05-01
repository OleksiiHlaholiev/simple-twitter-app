import {Dispatch} from "redux";
import {IUser, IUserWithToken, UserAction, UserActionTypes} from "../../types/user";
import {asyncRequest} from "../../services/api";
import {TIME_TOKEN_EXPIRED_IN_MIN, URL_API_BASE} from "../../constants";
import {showNotificationSuccess} from "../../helpers/notifications";

export const makeLoginRequest = (username: string, successCallBack?: (user: IUserWithToken) => void) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.LOGIN_USER});
            const requestURL = `${URL_API_BASE}/auth/login`;

            const response: IUserWithToken = await asyncRequest(requestURL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    /*username,*/
                    /*request with fake existing user params on the server*/
                    username: 'atuny0',
                    password: '9uQFF1Lh',
                    expiresInMins: TIME_TOKEN_EXPIRED_IN_MIN, // optional, defaults to 60
                }),
            });

            showNotificationSuccess(`Login is successful for real user: ${response.username}!`);
            dispatch({type: UserActionTypes.LOGIN_USER_SUCCESS, payload: response});
            successCallBack?.(response);
        } catch (error: any) {
            dispatch({
                type: UserActionTypes.LOGIN_USER_ERROR,
                payload: error.message,
            })
        }
    }
}

export const fetchLoggedUserInfo = (token: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USER});
            const requestURL = `${URL_API_BASE}/auth/me`;

            const response: IUser = await asyncRequest(requestURL, {
                method: 'GET',
                headers: {
                    'Authorization': token,  /* ! YOUR_TOKEN_HERE ! */
                },
            });

            dispatch({type: UserActionTypes.FETCH_USER_SUCCESS, payload: response});
        } catch (error: any) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: error.message,
            })
        }
    }
};

export const resetLoginUserState = (): UserAction => {
    return {type: UserActionTypes.RESET_LOGIN_USER_STATE}
}