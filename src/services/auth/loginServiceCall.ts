import axios from "axios";
import IAuthResponse from "../../schema/response/IAuthResponse";
import ILoginRequest from "../../schema/servicesSchema/ILoginRequest";
import { serverUrl } from "../constants";

export default async function loginServiceCall(userCred: ILoginRequest) {
    try {
        const response = await axios.post(serverUrl + "/auth/login", userCred);
        return response.data as IAuthResponse;
    } catch (err) {
        throw err;
    }
}
