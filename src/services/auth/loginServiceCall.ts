import axios from "axios";
import ILoginRequest from "../../schema/servicesSchema/ILoginRequest";
import { serverUrl } from "../constants";

export default async function loginServiceCall(userCred: ILoginRequest) {
    try {
        const response = await axios.post(serverUrl + "/auth/login", userCred);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}
