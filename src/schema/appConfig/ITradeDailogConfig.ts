import ITrade from "../products/ITrade";
import TradeType from "../products/TradeType";

export default interface ITradeDailogConfig {
    visible: boolean;
    productId: string;
    tradeType: TradeType;
    trade: ITrade | null;
}
