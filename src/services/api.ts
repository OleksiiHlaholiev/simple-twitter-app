import {OUTPUT_MESSAGES, POSTS_LIMIT, TIME_TOKEN_EXPIRED_IN_MIN, URL_API_BASE} from "../constants";
import {IPost, IPostResults} from "../types/post";
import {IUser, IUserWithToken} from "../types/user";
import {IToken} from "../types/token";
import {showNotificationError} from "../helpers/notifications";


export const asyncRequest = async (url: string, options?: any) => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        // processing of dummy API unhandled error, like 400/401...
        /*{
            "name": "TokenExpiredError",
            "message": "Token Expired!",
            "expiredAt": "2024-04-13T07:09:56.000Z"
        }*/
        //or
        /*{
            "name": "JsonWebTokenError",
            "message": "Invalid/Expired Token!"
        }*/
        if (!response.ok) {
            //throw new Error(data?.message ?? 'Unknown ERROR');
            console.log('!!! asyncRequest', {response, data})
            //TODO: check - throw custom 'error' object - to CustomError?
            // and WHY fetch ^^^ DOES NOT throw error by itself ???
            // current logic - pass through pseudo-error object
            throw({
                message: data?.message ?? 'Unknown ERROR',
                status: response?.status,
                statusText: response?.statusText
            });
        }
        console.log('!!! asyncRequest', {response, data})

        return data;
    } catch (error: any) {
        console.error(error);
        const isAuthMeCondition = error?.status === 401 && error?.message === OUTPUT_MESSAGES.ERROR_TOKEN_EXPIRED && url.includes('/auth/me');
        if (!isAuthMeCondition) {
            showNotificationError(error.message);
        }
        throw error;
    }
}

export const makeAuthLoginRequest = (username: string, password: string): Promise<IUserWithToken> => {
    const requestURL = `${URL_API_BASE}/auth/login`;

    return asyncRequest(requestURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            /*request with fake existing user params on the server*/
            username: 'michaelw',
            password: 'michaelwpass',
            expiresInMins: TIME_TOKEN_EXPIRED_IN_MIN, // optional, defaults to 60
        }),
    });
};

export const getPosts = (skip: number = 0): Promise<IPostResults> => {
    const requestURL = `${URL_API_BASE}/posts?limit=${POSTS_LIMIT}&skip=${skip}`;

    return asyncRequest(requestURL);
};

export const getPostById = (id = 0): Promise<IPost> => {
    const requestURL = `${URL_API_BASE}/posts/${id}`;

    return asyncRequest(requestURL);
};

export const getLoggedUserInfo = (accessToken: string): Promise<IUser> => {
    const requestURL = `${URL_API_BASE}/auth/me`;

    return asyncRequest(requestURL, {
        method: 'GET',
        headers: {
            'Authorization': accessToken,  /* ! YOUR_TOKEN_HERE ! */
        },
    });
};

export const refreshAuthSession = (refreshToken: string): Promise<IToken> => {
    const requestURL = `${URL_API_BASE}/auth/refresh`;

    return asyncRequest(requestURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            refreshToken, // Optional, if not provided, the server will use the cookie
            expiresInMins: TIME_TOKEN_EXPIRED_IN_MIN, // optional (FOR ACCESS TOKEN), defaults to 60
        }),
    });
};
