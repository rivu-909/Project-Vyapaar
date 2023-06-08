import axios from "axios";
import ILoginRequest from "../../schema/servicesSchema/ILoginRequest";
import User from "../../schema/user/User";
import { serverUrl } from "../../constants";

export default async function loginServiceCall(
    userCred: ILoginRequest
): Promise<User> {
    try {
        const response = await axios.post(serverUrl + "/auth/login", userCred);
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
