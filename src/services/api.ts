import {INVALID_TOKEN_OR_EXPIRED, POSTS_LIMIT, URL_API_BASE} from "../constants";
import {IPost, IPostResults, IUserWithToken} from "../dataTypes/dataTypes";

const asyncRequest = async (url: string, options?: any) => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    } catch (error: any) {
        if (error.message === INVALID_TOKEN_OR_EXPIRED) {
            debugger;
            //navigate(`/${ROUTES_PATH.login}`); //TODO: check the logic
        } else {
            throw error;
        }
    }
}

export const makeAuthLoginRequest = (username: string): Promise<IUserWithToken> => {
    const requestURL = `${URL_API_BASE}/auth/login`;

    return asyncRequest(requestURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        /*credentials: "include",*/
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

/* providing token in bearer */
/*fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer /!* YOUR_TOKEN_HERE *!/',
    },
})
    .then(res => res.json())
    .then(console.log);*/

export const getLoggedUserInfo = () => {
    const requestURL = `${URL_API_BASE}/auth/me`;

    return asyncRequest(requestURL, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token'),  /* ! YOUR_TOKEN_HERE ! */
        },
    });
};
