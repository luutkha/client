import { UserInfo } from "../interfaces/user.interface";

const ACCESS_TOKEN_KEY = 'accessToken';

export const saveUserDataToLocalStorage = (data: any) => {
     localStorage.setItem(ACCESS_TOKEN_KEY,JSON.stringify(data));
}

export const getUserDataFromLocalStorage = () => {
    return localStorage.getItem( ACCESS_TOKEN_KEY);
}

export const deleteUserDataFromLocalStorage = () => {
    return localStorage.removeItem( ACCESS_TOKEN_KEY);
}

export const getCurrentUserInfo = () => {

    const userData = JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY) + '') as UserInfo;

    return userData;

}

