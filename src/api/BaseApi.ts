import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { userServiceStore } from "../services/UserService/UserService.store";
import { memoizedRefreshToken } from "../services/RefreshTokenService/RefreshTokenService";

const httpConfig: AxiosRequestConfig = {
    baseURL: "http://localhost:8080",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
};


export interface CustomHeaders { }

export const getAuthorizationHeader = (customHeaders?: CustomHeaders) => ({
    headers: {
        Authorization: `Bearer ${userServiceStore.userData?.token}`,
        ...customHeaders
    }
});

export const BaseApi: AxiosInstance = axios.create(httpConfig);


BaseApi.interceptors.response.use((response) => response,
    async (error) => {
        const config = error?.config;

        if (error?.response?.status !== 401 || config?.sent) {
            return Promise.reject(error);
        }

        const didRefresh = await memoizedRefreshToken();

        if (!didRefresh) {
            return Promise.reject(error);
        }

        config.sent = true;

        config.headers = {
            ...config.headers,
            authorization: `Bearer ${userServiceStore.userData?.token}`
        };

        return BaseApi(config);
    }
);