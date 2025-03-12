import {useTypedSelector} from "./hook.useTypedSelector";
import {clearLocalStorage, setLocalStorageUser} from "../helpers/localStorageFuncs";
import {fetchLoggedUserInfo, resetLoginUserState} from "../store/action-creators/user";
import {resetPostsState} from "../store/action-creators/post";
import {ROUTES_PATH} from "../constants";
import {IToken} from "../types";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";


export const useUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useTypedSelector(state => state.user);

    const onLogoutHandler = () => {
        clearLocalStorage();
        dispatch(resetLoginUserState());
        dispatch(resetPostsState());
        navigate(`/${ROUTES_PATH.login}`);
    };

    const updateTokenAndReFetchCallBack = (token: IToken) => {
        setLocalStorageUser({
            ...user,
            ...(token ?? {}),
        });

        dispatch(fetchLoggedUserInfo(token.accessToken, token.refreshToken));
    };

    const onUpdateUserDataHandler = () => {
        dispatch(fetchLoggedUserInfo(
            user.accessToken,
            user.refreshToken,
            updateTokenAndReFetchCallBack,
            onLogoutHandler
        ));
    };

    return {
        onUpdateUserDataHandler,
        onLogoutHandler
    }
};