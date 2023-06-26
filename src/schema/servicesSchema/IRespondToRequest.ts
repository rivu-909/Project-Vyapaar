import RequestStatus from "../user/RequestStatus";

export default interface IRespondToRequest {
    token: string;
    updatedStatus: RequestStatus;
    tradeRequestId: string;
}
