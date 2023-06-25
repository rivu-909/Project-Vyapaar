import axios from "axios";
import { serverUrl } from "../../constants";
import IToken from "../../schema/servicesSchema/IToken";
import IUserRequests from "../../schema/user/IUserRequests";

export default async function fetchUserTradeRequestsServiceCall(
    params: IToken
): Promise<IUserRequests> {
    try {
        const response = await axios.get(serverUrl + "/request/user/all", {
            headers: {
                Authorization: params.token,
            },
        });
        return response.data.userTradeRequest;
    } catch (err) {
        throw err;
    }
}
