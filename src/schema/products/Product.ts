import LoadingState from "../LoadingState";
import ITrade from "./ITrade";

export default interface Product {
    productId: string;
    name: string;
    price: string;
    description: string;
    trades: Array<ITrade>;
    updatedAt: Date;
}
