import Address from "../Address";
import LoadingState from "../LoadingState";
import IConnection from "./IConnection";
import IUserRequests from "./IUserRequests";

interface UserState {
    userId: string | null;
    name: string | null;
    phoneNumber: string | null;
    address: Address | null;
    token: string | null;
    connections: Array<IConnection>;
    requests: IUserRequests;
    authState: LoadingState;
    connectionState: LoadingState;
    reqNConnectionsState: LoadingState;
}

export default UserState;
