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

/* ------------------- Redux types for User start ------------------- */

export enum UserActionTypes {
    LOGIN_USER = "LOGIN_USER",
    LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
    LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
}

export interface UserSessionState {
    user: IUserWithToken;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: null | string;
}

interface LoginUserAction {
    type: UserActionTypes.LOGIN_USER;
}

interface LoginUserSuccessAction {
    type: UserActionTypes.LOGIN_USER_SUCCESS;
    payload: IUserWithToken; //TODO: check
}

interface LoginUserErrorAction {
    type: UserActionTypes.LOGIN_USER_ERROR;
    payload: string;
}

export type UserAction =
    LoginUserAction |
    LoginUserSuccessAction |
    LoginUserErrorAction;

/* ------------------- Redux types for User end ------------------- */