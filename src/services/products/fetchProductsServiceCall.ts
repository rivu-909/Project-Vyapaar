import axios from "axios";
import IFetchProductRequest from "../../schema/servicesSchema/IFetchProductRequest";
import { serverUrl } from "../../constants";
import Product from "../../schema/products/Product";

export default async function fetchProductsServiceCall(
    params: IFetchProductRequest
): Promise<Array<Product>> {
    try {
        console.log(params.token);
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
