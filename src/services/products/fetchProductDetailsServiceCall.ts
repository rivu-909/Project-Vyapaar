// import axios from "axios";
// import { serverUrl } from "../../constants";
// import IFetchProductDetailsRequest from "../../schema/servicesSchema/IFetchProductDetailsRequest";

// export default async function fetchProductDetailsServiceCall(
//     params: IFetchProductDetailsRequest
// ) {
//     try {
//         const response = await axios.get(
//             `${serverUrl}/product/details/${params.productId}`,
//             {
//                 headers: {
//                     Authorization: params.token,
//                 },
//             }
//         );
//         return response;
//     } catch (err) {
//         throw err;
//     }
// }
