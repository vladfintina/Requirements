import { makeAutoObservable } from "mobx";
import { RegisterErrorType, RegisterUserType, EMPTY_REGISTER_USER, EMPTY_REGISTER_ERROR } from "./RegisterPage.types";
import { createContext } from "react";

export class RegisterPageStore {
    public registerData: RegisterUserType = EMPTY_REGISTER_USER;
    public errorData: RegisterErrorType = EMPTY_REGISTER_ERROR;

    constructor() {
        makeAutoObservable(this);
    }

    public setFirstNameValue = (event: React.ChangeEvent<HTMLInputElement>) => this.registerData.firstName = event.target.value;

    public setLastNameValue = (event: React.ChangeEvent<HTMLInputElement>) => this.registerData.lastName = event.target.value;

    public setEmailValue = (event: React.ChangeEvent<HTMLInputElement>) => this.registerData.email = event.target.value;

    public setPasswordValue = (event: React.ChangeEvent<HTMLInputElement>) => this.registerData.password = event.target.value;

    public setConfirmedPasswordValue = (event: React.ChangeEvent<HTMLInputElement>) => this.registerData.confirmedPassword = event.target.value;

    public setFirstNameError = (value: string) => this.errorData.firstNameError.message = value;

    public setLastNameError = (value: string) => this.errorData.lastNameError.message = value;

    public setEmailError = (value: string) => this.errorData.emailError.message = value;

    public setPasswordError = (value: string) => this.errorData.passwordError.message = value;

    public setConfirmedPasswordError = (value: string) => this.errorData.confirmedPasswordError.message = value;

    public setFirstNameIsTouched = () => this.errorData.firstNameError.isTouched = true;

    public setLastNameIsTouched = () => this.errorData.lastNameError.isTouched = true;

    public setEmailIsTouched = () => this.errorData.emailError.isTouched = true;

    public setPasswordIsTouched = () => this.errorData.passwordError.isTouched = true;

    public setConfirmedPasswordIsTouched = () => this.errorData.confirmedPasswordError.isTouched = true;

    public reset = () => {
        this.registerData = EMPTY_REGISTER_USER;
        this.errorData = EMPTY_REGISTER_ERROR;
    }

    public createUser = async () => {
        try {
            console.log("createUser", this.registerData.email)
            //await postRegister(this.registerData);
            return true;
        } catch (error: any) {
            console.log(error)
        }
    }
}

export const registerPageStore = new RegisterPageStore();
export const RegisterPageContext = createContext(registerPageStore);