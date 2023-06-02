import axios from "axios";
import IAuthResponse from "../../schema/response/IAuthResponse";
import ISignUpRequest from "../../schema/servicesSchema/ISignUpRequest";
import { serverUrl } from "../constants";

export default async function signUpServiceCall(userCred: ISignUpRequest) {
    try {
        const response = await axios.post(serverUrl + "/auth/signUp", userCred);
        return response.data as IAuthResponse;
    } catch (err) {
        throw err;
    }
}
