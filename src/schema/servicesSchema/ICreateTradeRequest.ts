import Address from "../Address";
import TradeType from "../products/TradeType";

export default interface ICreateTradeRequest {
    productId: string;
    token: string;
    price: string;
    address: Address;
    type: TradeType;
    quantity: string;
}
