import axios from "axios";
import { serverUrl } from "../../constants";
import ISendTradeRequest from "../../schema/servicesSchema/ISendTradeRequest";
import ITradeRequest from "../../schema/user/ITradeRequest";

export default async function sendTradeRequestServiceCall(
    params: ISendTradeRequest
): Promise<ITradeRequest> {
    try {
        const response = await axios.post(
            `${serverUrl}/request/new/${params.productId}/${params.tradeId}`,
            {
                receiverId: params.receiverId,
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
