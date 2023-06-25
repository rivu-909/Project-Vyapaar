import LoadingState from "../LoadingState";
import IConnection from "./IConnection";
import IUserRequests from "./IUserRequests";

interface UserState {
    userId: string | null;
    name: string | null;
    phoneNumber: string | null;
    token: string | null;
    requests: IUserRequests;
    loginState: LoadingState;
    signUpState: LoadingState;
    bootState: LoadingState;
    requestsState: LoadingState;
    connectionState: LoadingState;
    connections: Array<IConnection>;
}

export default UserState;
