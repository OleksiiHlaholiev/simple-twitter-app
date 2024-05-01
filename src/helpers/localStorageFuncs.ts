import {IUserWithToken} from "../types/user";

export const setLocalStorageUser = (user: IUserWithToken) => {
    try {
        const userStringify = JSON.stringify(user);
        localStorage.setItem('user', userStringify);
    } catch (error) {
        console.error(error);
    }
}

export const getLocalStorageUser = (): IUserWithToken | null => {
    try {
        const user = localStorage.getItem('user');
        const userParse = JSON.parse(user ?? '');
        console.log('getLocalStorageUser: ', userParse);
        return userParse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const clearLocalStorage = () => {
    localStorage.removeItem('user');
}
