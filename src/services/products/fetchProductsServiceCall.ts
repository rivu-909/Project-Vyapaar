import axios from "axios";
import IFetchProductRequest from "../../schema/servicesSchema/IFetchProductRequest";
import { serverUrl } from "../constants";

export default async function fetchProductsServiceCall(
    params: IFetchProductRequest
) {
    try {
        const response = await axios.get(serverUrl + "/product/all", {
            headers: {
                Authorization: params.token,
            },
        });
        return response;
    } catch (err) {
        throw err;
    }
}
