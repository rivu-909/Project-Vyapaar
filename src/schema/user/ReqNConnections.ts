import IConnection from "./IConnection";
import IUserRequests from "./IUserRequests";

export default interface ReqNConnections {
    requests: IUserRequests;
    connections: Array<IConnection>;
}
