import axios from "axios";
import { serverUrl } from "../../constants";
import Product from "../../schema/products/Product";
import IUpdateTradeService from "../../schema/servicesSchema/IUpdateTradeRequest";

export default async function updateTradeServiceCall(
    params: IUpdateTradeService
): Promise<Product> {
    try {
        const response = await axios.put(
            `${serverUrl}/trade/update/${params.productId}/${params.tradeId}`,
            {
                price: params.price,
                address: params.address,
                quantity: params.quantity,
                type: params.type,
            },
            {
                headers: {
                    Authorization: params.token,
                },
            }
        );
        return response.data.product;
    } catch (err) {
        throw err;
    }
}
