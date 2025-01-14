import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { RefreshTokenType } from "../RefreshTokenService/RefreshToken.types";
import { UserType } from "../../authenticationPages/LoginPage/LoginPage.types";

export class UserServiceStore {
    public userData: UserType | null | undefined = undefined;

    constructor () {
        makeAutoObservable(this);
    }

    public isUserInitialized = () => this.userData !== undefined;

    public isAuthenticated = () => !!this.userData;

    public setUserData = (user: UserType) => {
        this.userData = user;
        this.persistUser();
    }

    public clearUserData = () => {
        this.userData = null;
        sessionStorage.removeItem("user");
    }

    public initialize = () => {
        const userDataAsString = sessionStorage.getItem("user");
        this.userData = userDataAsString && JSON.parse(userDataAsString);
    }

    public updateToken = (tokenPair: RefreshTokenType) => {
        if (!this.userData) {
            return;
        }

        this.userData.token = tokenPair.accessToken;
        this.userData.refreshToken = tokenPair.refreshToken;
        this.persistUser();
    }

    private persistUser = () =>
        sessionStorage.setItem("user", JSON.stringify(this.userData));
}

export const userServiceStore  = new UserServiceStore();
export const UserServiceContext = createContext(userServiceStore);