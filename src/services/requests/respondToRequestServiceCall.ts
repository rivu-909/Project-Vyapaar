import axios from "axios";
import { serverUrl } from "../../constants";
import IRespondToRequest from "../../schema/servicesSchema/IRespondToRequest";
import ITradeRequest from "../../schema/user/ITradeRequest";

export default async function respondToRequestServiceCall(
    params: IRespondToRequest
): Promise<ITradeRequest> {
    try {
        const response = await axios.put(
            `${serverUrl}/request/respond/${params.tradeRequestId}`,
            {
                updatedStatus: params.updatedStatus,
            },
            {
                headers: {
                    Authorization: params.token,
                },
            }
        );
        return response.data.tradeRequest;
    } catch (err) {
        throw err;
    }
}
