// noinspection TypeScriptValidateTypes

import { BaseApi } from "./BaseApi";
import { LoginType, UserType } from "../authenticationPages/LoginPage/LoginPage.types";
import { RefreshTokenType } from "../services/RefreshTokenService/RefreshToken.types";
import {RegisterUserType} from "../authenticationPages/RegisterPage/RegisterPage.types.ts";

const API_PATH = "api/user";

export const postLogin = async (loginData: LoginType): Promise<UserType> => {
    const { data } = await BaseApi.post(`/login`, loginData);
    return data;
}

export const postRegister = async (registerData: RegisterUserType) => {
    console.log("postRegister")
    await BaseApi.post(`/register`, registerData);
}

export const postRefresh = async (refreshTokenData: RefreshTokenType) : Promise<RefreshTokenType> => {
    const { data } = await BaseApi.post(`${API_PATH}/refresh-token`, refreshTokenData);
    return data;
}