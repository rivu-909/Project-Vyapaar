import ITradeRequest from "./ITradeRequest";

export default interface IUserRequests {
    sent: Array<ITradeRequest>;
    received: Array<ITradeRequest>;
}
