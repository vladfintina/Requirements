export interface LoginType {
    username: string;
    password: string;
}

export const EMPTY_LOGIN: LoginType = {
    username: "",
    password: ""
};

export interface ErrorDetails {
    message: string;
    isTouched: boolean;
}

export interface LoginErrorType {
    usernameError: ErrorDetails;
    passwordError: ErrorDetails;
}

export const EMPTY_LOGIN_ERROR: LoginErrorType = {
    usernameError: {
        message: "",
        isTouched: false
    },
    passwordError: {
        message: "",
        isTouched: false
    }
};

export interface UserType {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    token: string;
    refreshToken: string;
}
