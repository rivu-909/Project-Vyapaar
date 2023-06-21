import axios from "axios";
import { serverUrl } from "../../constants";
import IToken from "../../schema/servicesSchema/IToken";
import IArticle from "../../schema/news/IArticle";

export default async function fetchNewsServiceCall(
    params: IToken
): Promise<Array<IArticle>> {
    try {
        const response = await axios.get(serverUrl + "/news", {
            headers: {
                Authorization: params.token,
            },
        });
        return response.data.articles;
    } catch (err) {
        throw err;
    }
}
