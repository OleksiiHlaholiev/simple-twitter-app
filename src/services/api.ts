import {POSTS_LIMIT, URL_API_BASE} from "../constants";
import {IPost, IPostResults} from "../types/post";
import {IUserWithToken} from "../types/user";
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
            throw new Error(data?.message ?? 'Unknown ERROR');
        }

        return data;
    } catch (error: any) {
        console.error(error);
        showNotificationError(error.message);
        throw error;
    }
}

export const makeAuthLoginRequest = (username: string): Promise<IUserWithToken> => {
    const requestURL = `${URL_API_BASE}/auth/login`;

    return asyncRequest(requestURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            /*username,*/
            /*request with fake existing user params on the server*/
            username: 'atuny0',
            password: '9uQFF1Lh',
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

export const getLoggedUserInfo = (token: string) => {
    const requestURL = `${URL_API_BASE}/auth/me`;

    return asyncRequest(requestURL, {
        method: 'GET',
        headers: {
            'Authorization': token,  /* ! YOUR_TOKEN_HERE ! */
        },
    });
};
