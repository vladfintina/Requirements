import mem from "mem";
import { userServiceStore } from "../UserService/UserService.store";
import { postRefresh } from "../../api/AuthenticationApi";
import { RefreshTokenType } from "./RefreshToken.types";

const refreshTokenFn = async () => {
    const { userData } = userServiceStore;

    try {
        if (userData == null) {
            userServiceStore.clearUserData();
            return false;
        }

        const refreshTokenRequest: RefreshTokenType = {
            accessToken: userData.token,
            refreshToken: userData.refreshToken
        }

        const response = await postRefresh(refreshTokenRequest);

        userServiceStore.updateToken(response);

        return true;
    } catch (error) {
        userServiceStore.clearUserData();

        return false;
    }
};

const maxAgeInMilliseconds = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
    maxAge: maxAgeInMilliseconds,
});