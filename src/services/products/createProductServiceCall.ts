import axios from "axios";
import { serverUrl } from "../../constants";
import ICreateProductRequest from "../../schema/servicesSchema/ICreateProductRequest";
import Product from "../../schema/products/Product";

export default async function createProductServiceCall(
    params: ICreateProductRequest
): Promise<Product> {
    try {
        const response = await axios.post(
            serverUrl + "/product/new",
            {
                name: params.name,
                description: params.description,
                price: params.price,
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
