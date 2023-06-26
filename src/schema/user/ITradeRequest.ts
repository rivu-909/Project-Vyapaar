import RequestStatus from "./RequestStatus";

export default interface ITradeRequest {
    _id: string;
    senderId: string;
    receiverId: string;
    status: RequestStatus;
    productId: string;
    tradeId: string;
}
