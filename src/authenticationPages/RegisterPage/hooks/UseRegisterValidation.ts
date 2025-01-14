import { useContext } from "react";
import { RegisterPageContext } from "../RegisterPage.store";
import { emailValidation, nameValidation, passwordValidation} from "../../../shared/ValidationInputs";
import { RegisterUserType } from "../RegisterPage.types";

export const useRegisterValidation = (onSuccess: () => Promise<void>, registerData: RegisterUserType) => {
    const {
        errorData,
        setEmailError,
        setPasswordError,
    } = useContext(RegisterPageContext);

    setEmailError(emailValidation(registerData.email));
    setPasswordError(passwordValidation(registerData.password));

    const sendRegisterData = async () => {
        if (errorData.usernameError.message === "" &&
            errorData.emailError.message === "" &&
            errorData.passwordError.message === "") {
            await onSuccess();
        }
    }

    return sendRegisterData;
}