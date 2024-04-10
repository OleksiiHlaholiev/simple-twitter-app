import {URL_API_BASE} from "../constants";

const asyncRequest = async (url: string, options?: any) => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}

export const makeAuthLoginRequest = (username: string) => {
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
