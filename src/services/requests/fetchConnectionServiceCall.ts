import axios from "axios";
import { serverUrl } from "../../constants";
import IFetchConnection from "../../schema/servicesSchema/IFetchConnection";
import IConnection from "../../schema/user/IConnection";

export default async function fetchConnectionServiceCall(
    params: IFetchConnection
): Promise<IConnection> {
    try {
        const response = await axios.get(
            `${serverUrl}/request/user/${params.tradeRequestId}`,
            {
                headers: {
                    Authorization: params.token,
                },
            }
        );
        return {
            ...response.data.connection,
            tradeRequestId: params.tradeRequestId,
        };
    } catch (err) {
        throw err;
    }
}
