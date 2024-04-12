import { IUserWithToken } from "../../dataTypes/dataTypes";

interface UserState {
    user: IUserWithToken;
    isAuth: boolean;
    error: null | string;
}

const initialState: UserState = {
    user: {
        id: 0,
        username: '',
        token: '',
    },
    isAuth: false,
    error: null,
};

/*
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_USER":
    }
};*/
