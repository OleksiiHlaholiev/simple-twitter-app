import {IToken} from "./token";

export interface IUser {
    id: number;
    username: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    image?: string;
    crypto?: {
        coin?: string;
    }
}

export interface IUserWithToken extends IUser, IToken {

}

/* ------------------- Redux types for User start ------------------- */

export enum UserActionTypes {
    LOGIN_USER = "LOGIN_USER",
    LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
    LOGIN_USER_ERROR = "LOGIN_USER_ERROR",

    FETCH_USER = "FETCH_USER",
    FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
    FETCH_USER_ERROR = "FETCH_USER_ERROR",

    REFRESH_USER_TOKEN = "REFRESH_USER_TOKEN",
    REFRESH_USER_TOKEN_SUCCESS = "REFRESH_USER_TOKEN_SUCCESS",
    REFRESH_USER_TOKEN_ERROR = "FETCH_USER_ERROR",

    RESET_LOGIN_USER_STATE = "RESET_LOGIN_USER_STATE",
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

interface ResetLoginUserAction {
    type: UserActionTypes.RESET_LOGIN_USER_STATE;
}

interface LoginUserSuccessAction {
    type: UserActionTypes.LOGIN_USER_SUCCESS;
    payload: IUserWithToken;
}

interface LoginUserErrorAction {
    type: UserActionTypes.LOGIN_USER_ERROR;
    payload: string;
}

interface FetchUserAction {
    type: UserActionTypes.FETCH_USER;
}

interface FetchUserSuccessAction {
    type: UserActionTypes.FETCH_USER_SUCCESS;
    payload: IUser;
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR;
    payload: string;
}

interface RefreshUserTokenAction {
    type: UserActionTypes.REFRESH_USER_TOKEN;
}

interface RefreshUserTokenSuccessAction {
    type: UserActionTypes.REFRESH_USER_TOKEN_SUCCESS;
    payload: IToken;
}

interface RefreshUserTokenErrorAction {
    type: UserActionTypes.REFRESH_USER_TOKEN_ERROR;
    payload: string;
}

export type UserAction =
    LoginUserAction |
    ResetLoginUserAction |
    LoginUserSuccessAction |
    LoginUserErrorAction |
    FetchUserAction |
    FetchUserSuccessAction |
    FetchUserErrorAction |
    RefreshUserTokenAction |
    RefreshUserTokenSuccessAction |
    RefreshUserTokenErrorAction;

/* ------------------- Redux types for User end ------------------- */