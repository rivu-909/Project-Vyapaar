import axios from "axios";
import ISignUpRequest from "../../schema/servicesSchema/ISignUpRequest";
import { serverUrl } from "../constants";

export default async function signUpServiceCall(userCred: ISignUpRequest) {
    try {
        const response = await axios.post(serverUrl + "/auth/signUp", userCred);
        return response.data;
    } catch (err) {
        // we need to throw from here and catch it in the respective action
        console.log(err);
    }
}
