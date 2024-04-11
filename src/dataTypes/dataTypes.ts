export interface IUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

export interface IUserWithToken extends  IUser {
    token: string;
}

export interface IPost {
    body: string;
    id: number;
    reactions: number;
    tags: string[];
    title: string;
    userId: number;
}

export interface IPostResults {
    total: number;
    skip: number;
    limit: number;
    posts: IPost[];
}

