import axios from "axios";
import ISignUpRequest from "../../schema/servicesSchema/ISignUpRequest";
import User from "../../schema/user/User";
import { serverUrl } from "../../constants";

export default async function signUpServiceCall(
    userCred: ISignUpRequest
): Promise<User> {
    try {
        const response = await axios.post(serverUrl + "/auth/signUp", userCred);
        const data = response.data;
        const userData: User = {
            userId: data.user.userId,
            name: data.user.name,
            phoneNumber: data.user.phoneNumber,
            token: data.token,
        };
        return userData;
    } catch (err) {
        throw err;
    }
}
