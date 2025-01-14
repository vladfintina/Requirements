import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { LoginType, LoginErrorType, EMPTY_LOGIN, EMPTY_LOGIN_ERROR } from "./LoginPage.types";

export class LoginPageStore {
    public loginData: LoginType = EMPTY_LOGIN;
    public errorData: LoginErrorType = EMPTY_LOGIN_ERROR;

    constructor() {
        makeAutoObservable(this);
    }

    public setEmailValue = (event: React.ChangeEvent<HTMLInputElement>) => this.loginData.email = event.target.value;

    public setPasswordValue = (event: React.ChangeEvent<HTMLInputElement>) => this.loginData.password = event.target.value;

    public setEmailError = (value: string) => this.errorData.emailError.message = value;

    public setPasswordError = (value: string) => this.errorData.passwordError.message = value;

    public setEmailIsTouched = () => this.errorData.emailError.isTouched = true;

    public setPasswordIsTouched = () => this.errorData.passwordError.isTouched = true;

    public reset = () => {
        this.loginData = EMPTY_LOGIN;
        this.errorData = EMPTY_LOGIN_ERROR;
    }

    public fetchUser = async () => {
        try {
            console.log("Called backend for login");
            //const user = {} //await postLogin(this.loginData);
            //userServiceStore.setUserData(user);
            console.log("After user login");
        } catch (error) {
            console.log("Catch error: Set Server Errors")
        }
    }
}

export const loginPageStore = new LoginPageStore();
export const LoginPageContext = createContext(loginPageStore);