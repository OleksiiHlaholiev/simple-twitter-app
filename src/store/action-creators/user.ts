import {Dispatch} from "redux";
import {UserAction, UserActionTypes} from "../../types/user";
import {asyncRequest} from "../../services/api";
import {URL_API_BASE} from "../../constants";

//TODO: check the logic with store
export const makeLoginRequest = (username: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.LOGIN_USER});
            const requestURL = `${URL_API_BASE}/auth/login`;

            const response = await asyncRequest(requestURL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    /*username,*/
                    /*request with fake existing user params on the server*/
                    username: 'atuny0',
                    password: '9uQFF1Lh',
                }),
            });

            dispatch({type: UserActionTypes.LOGIN_USER_SUCCESS, payload: response});
        } catch (error: any) {
            dispatch({
                type: UserActionTypes.LOGIN_USER_ERROR,
                payload: error.message,
            })
        }
    }
}