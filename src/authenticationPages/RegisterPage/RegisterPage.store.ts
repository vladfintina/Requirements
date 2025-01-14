import { makeAutoObservable } from "mobx";
import { RegisterErrorType, RegisterUserType, EMPTY_REGISTER_USER, EMPTY_REGISTER_ERROR } from "./RegisterPage.types";
import { createContext } from "react";
import {postRegister} from "../../api/AuthenticationApi.ts";

export class RegisterPageStore {
    public registerData: RegisterUserType = EMPTY_REGISTER_USER;
    public errorData: RegisterErrorType = EMPTY_REGISTER_ERROR;

    constructor() {
        makeAutoObservable(this);
    }

    public setUsernameValue = (event: React.ChangeEvent<HTMLInputElement>) => this.registerData.username = event.target.value;

    public setUserTypeValue = (event: React.ChangeEvent<HTMLInputElement>) => this.registerData.userType = event.target.value;

    public setEmailValue = (event: React.ChangeEvent<HTMLInputElement>) => this.registerData.email = event.target.value;

    public setPasswordValue = (event: React.ChangeEvent<HTMLInputElement>) => this.registerData.password = event.target.value;


    public setUsernameError = (value: string) => this.errorData.usernameError.message = value;

    public setEmailError = (value: string) => this.errorData.emailError.message = value;

    public setPasswordError = (value: string) => this.errorData.passwordError.message = value;

    public setUsernameIsTouched = () => this.errorData.usernameError.isTouched = true;

    public setUserTypeIsTouched = () => this.errorData.userTypeError.isTouched = true;

    public setEmailIsTouched = () => this.errorData.emailError.isTouched = true;

    public setPasswordIsTouched = () => this.errorData.passwordError.isTouched = true;

    public reset = () => {
        this.registerData = EMPTY_REGISTER_USER;
        this.errorData = EMPTY_REGISTER_ERROR;
    }

    public createUser = async () => {
        try {
            console.log("createUser", this.registerData.email)
            await postRegister(this.registerData);
            return true;
        } catch (error: any) {
            console.log(error)
        }
    }
}

export const registerPageStore = new RegisterPageStore();
export const RegisterPageContext = createContext(registerPageStore);