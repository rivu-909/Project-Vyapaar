import Address from "../Address";
import TradeType from "./TradeType";

export default interface ITrade {
    _id: string;
    userId: string;
    price: string;
    address: Address;
    type: TradeType;
    quantity: string;
}
