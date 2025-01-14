import { useContext } from "react";
import { LoginPageContext } from "../LoginPage.store";
import { emailValidation, passwordValidation } from "../../../shared/ValidationInputs";

export const useLoginValidation = (fetchUser: () => Promise<void>) => {
    const {
        loginData: { username, password },
        errorData,
        setPasswordError,
    } = useContext(LoginPageContext);

    setPasswordError(passwordValidation(password));

    const validateError = async () => {
        console.log("Validate Error username:", errorData.usernameError.message)
        console.log("Email:", username);
        if (errorData.usernameError.message === "" && errorData.passwordError.message === "") {
            await fetchUser();
        }
    }

    return validateError;
};