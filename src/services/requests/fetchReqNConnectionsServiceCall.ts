import axios from "axios";
import { serverUrl } from "../../constants";
import IToken from "../../schema/servicesSchema/IToken";
import IUserRequests from "../../schema/user/IUserRequests";
import ReqNConnections from "../../schema/user/ReqNConnections";

export default async function fetchReqNConnectionsServiceCall(
    params: IToken
): Promise<ReqNConnections> {
    try {
        const response = await axios.get(serverUrl + "/request/user/all", {
            headers: {
                Authorization: params.token,
            },
        });
        return {
            requests: response.data.userTradeRequest,
            connections: response.data.connections,
        };
    } catch (err) {
        throw err;
    }
}
