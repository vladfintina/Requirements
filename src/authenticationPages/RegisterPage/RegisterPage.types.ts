import { ErrorDetails } from "../LoginPage/LoginPage.types";

export interface RegisterUserType {
    username: string;
    userType: string;
    email: string;
    password: string;
}

export const EMPTY_REGISTER_USER: { password: string; username: string; userType: string; email: string } = {
    username: "",
    userType: "",
    email: "",
    password: "",
};

export interface RegisterErrorType {
    usernameError: ErrorDetails;
    userTypeError: ErrorDetails;
    emailError: ErrorDetails;
    passwordError: ErrorDetails;
}

export const EMPTY_REGISTER_ERROR: RegisterErrorType = {
    usernameError: {
        message: "",
        isTouched: false
    },
    userTypeError:{
        message:"",
        isTouched:false
    },
    emailError: {
        message: "",
        isTouched: false
    },
    passwordError: {
        message: "",
        isTouched: false
    },
};