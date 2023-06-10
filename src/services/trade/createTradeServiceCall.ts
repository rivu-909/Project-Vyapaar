import axios from "axios";
import { serverUrl } from "../../constants";
import ICreateTradeRequest from "../../schema/servicesSchema/ICreateTradeRequest";
import Product from "../../schema/products/Product";

export default async function createTradeServiceCall(
    params: ICreateTradeRequest
): Promise<Product> {
    try {
        const response = await axios.post(
            `${serverUrl}/trade/new/${params.productId}`,
            {
                price: params.price,
                address: params.address,
                type: params.type,
                quantity: params.quantity,
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
