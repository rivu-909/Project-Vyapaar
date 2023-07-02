import RequestStatus from "./RequestStatus";

export default interface ITradeRequest {
    _id: string;
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
    status: RequestStatus;
    productId: string;
    tradeId: string;
    createdAt: string;
    updatedAt: Date;
}
