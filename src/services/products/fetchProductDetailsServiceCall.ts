import axios from "axios";
import { serverUrl } from "../../constants";
import Product from "../../schema/products/Product";
import IFetchProductDetailsRequest from "../../schema/servicesSchema/IFetchProductDetailsRequest";

export default async function fetchProductDetailsServiceCall(
    params: IFetchProductDetailsRequest
): Promise<Product> {
    try {
        const response = await axios.get(
            `${serverUrl}/product/details/${params.productId}`,
            {
                headers: {
                    Authorization: params.token,
                },
            }
        );

        const product = response.data.product;
        return product;
    } catch (err) {
        throw err;
    }
}
