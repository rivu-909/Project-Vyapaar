import LoadingState from "../LoadingState";

interface UserState {
    userId: string | null;
    name: string | null;
    phoneNumber: string | null;
    token: string | null;
    loginState: LoadingState;
    signUpState: LoadingState;
    bootState: LoadingState;
}

export default UserState;
