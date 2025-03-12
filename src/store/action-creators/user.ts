import {Dispatch} from "redux";
import {IUser, IUserWithToken, UserAction, UserActionTypes} from "../../types/user";
import {IToken} from "../../types/token";
import * as api from "../../services/api";
import {OUTPUT_MESSAGES} from "../../constants";
import {showNotificationError, showNotificationSuccess} from "../../helpers/notifications";
import {setLocalStorageUser} from "../../helpers/localStorageFuncs";


export const makeLoginRequest = (username: string, password: string, successCallBack?: (user: IUserWithToken) => void) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.LOGIN_USER});
            const response: IUserWithToken = await api.makeAuthLoginRequest(username, password);
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

export const fetchLoggedUserInfo = (
    accessToken: string,
    refreshToken: string,
    updateTokenAndReFetchCallBack?: (token: IToken) => void,
    onLogoutHandler?: () => void
) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USER});
            const response: IUser = await api.getLoggedUserInfo(accessToken);
            dispatch({type: UserActionTypes.FETCH_USER_SUCCESS, payload: response});
            setLocalStorageUser({
                ...response,
                accessToken,
                refreshToken,
            });
        } catch (error: any) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: error.message,
            })
            //TODO: check - handle status code "401 Unauthorized" error
            // current logic - try to refreshAuthSession via refresh token
            if (error?.status === 401 && error?.message === OUTPUT_MESSAGES.ERROR_TOKEN_EXPIRED) {
                try {
                    dispatch({type: UserActionTypes.REFRESH_USER_TOKEN});
                    const refreshAuthResponse: IToken = await api.refreshAuthSession(refreshToken)
                    dispatch({type: UserActionTypes.REFRESH_USER_TOKEN_SUCCESS, payload: refreshAuthResponse});
                    updateTokenAndReFetchCallBack?.(refreshAuthResponse);
                } catch (refreshAuthErr: any) {
                    dispatch({
                        type: UserActionTypes.REFRESH_USER_TOKEN_ERROR,
                        payload: refreshAuthErr.message,
                    })
                    showNotificationError(`${refreshAuthErr.message} Please, re-login into the system.`);
                    onLogoutHandler?.()
                }
            }
        }
    }
};

export const resetLoginUserState = (): UserAction => {
    return {type: UserActionTypes.RESET_LOGIN_USER_STATE}
}