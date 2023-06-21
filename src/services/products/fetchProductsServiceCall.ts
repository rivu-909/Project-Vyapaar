import axios from "axios";
import IToken from "../../schema/servicesSchema/IToken";
import { serverUrl } from "../../constants";
import Product from "../../schema/products/Product";

export default async function fetchProductsServiceCall(
    params: IToken
): Promise<Array<Product>> {
    try {
        const response = await axios.get(`${serverUrl}/product/all`, {
            headers: {
                Authorization: params.token,
            },
        });

        const products = response.data.products;
        return products;
    } catch (err) {
        throw err;
    }
}
