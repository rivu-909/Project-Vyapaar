import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserState from "../../../schema/user/UserState";
import login from "../../../actions/auth/authHandler";
import signUp from "../../../actions/auth/signUp";
import LoadingState from "../../../schema/LoadingState";
import User from "../../../schema/user/User";
import getUserTradeRequests from "../../../actions/requests/getUserTradeRequests";
import IUserRequests from "../../../schema/user/IUserRequests";
import sendTradeRequests from "../../../actions/requests/sendTradeRequest";
import ITradeRequest from "../../../schema/user/ITradeRequest";
import respondToRequest from "../../../actions/requests/respondToRequest";
import fetchConnection from "../../../actions/requests/fetchConnection";
import IConnection from "../../../schema/user/IConnection";
import IError from "../../../schema/IError";
import Address from "../../../schema/Address";

const initialState: UserState = {
    token: null,
    name: null,
    userId: null,
    phoneNumber: null,
    address: null,
    requests: {
        sent: [],
        received: [],
    },
    loginState: LoadingState.idle,
    signUpState: LoadingState.idle,
    bootState: LoadingState.pending,
    requestsState: LoadingState.idle,
    connections: [],
    connectionState: LoadingState.idle,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // BOOT

        setBootState: (
            state: UserState,
            action: PayloadAction<LoadingState>
        ) => {
            state.bootState = action.payload;
        },

        // USER

        setUser: (state: UserState, action: PayloadAction<User>) => {
            state.name = action.payload.name;
            state.phoneNumber = action.payload.phoneNumber;
            state.userId = action.payload.userId;
        },

        // TOKEN

        setToken: (state: UserState, action: PayloadAction<string>) => {
            state.token = action.payload;
        },

        // LOGOUT

        logout: (state: UserState) => {
            state.loginState = LoadingState.idle;
            state.token = null;
        },

        // NEW REQUEST

        addRequest: (
            state: UserState,
            action: PayloadAction<ITradeRequest>
        ) => {
            if (state.userId === action.payload.receiverId) {
                state.requests.received.push(action.payload);
            }
        },

        // CHANGE REQUEST STATUS

        editRequestResponse: (
            state: UserState,
            action: PayloadAction<ITradeRequest>
        ) => {
            const idx = state.requests.sent.findIndex(
                (r) => r._id === action.payload._id
            );
            if (idx !== -1) {
                state.requests.sent.splice(idx, 1, action.payload);
            }
        },

        // ADDRESS

        setUserAddress: (state: UserState, action: PayloadAction<Address>) => {
            state.address = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder

            // LOGIN

            .addCase(login.pending.type, (state: UserState) => {
                state.loginState = LoadingState.pending;
            })
            .addCase(login.fulfilled.type, addUser)
            .addCase(
                login.rejected.type,
                (state: UserState, action: PayloadAction<IError>) => {
                    state.loginState = LoadingState.failed;
                }
            )

            // SIGNUP

            .addCase(signUp.pending.type, (state: UserState) => {
                state.signUpState = LoadingState.pending;
            })
            .addCase(signUp.fulfilled.type, addUser)
            .addCase(
                signUp.rejected.type,
                (state: UserState, action: PayloadAction<IError>) => {
                    state.signUpState = LoadingState.failed;
                }
            )

            // TRADE REQUESTS

            .addCase(getUserTradeRequests.pending.type, (state: UserState) => {
                state.requestsState = LoadingState.pending;
            })
            .addCase(
                getUserTradeRequests.fulfilled.type,
                (state: UserState, action: PayloadAction<IUserRequests>) => {
                    state.requestsState = LoadingState.success;
                    state.requests = action.payload;
                }
            )
            .addCase(getUserTradeRequests.rejected.type, (state: UserState) => {
                state.requestsState = LoadingState.failed;
            })

            // SEND REQUEST

            .addCase(
                sendTradeRequests.fulfilled.type,
                (state: UserState, action: PayloadAction<ITradeRequest>) => {
                    state.requests?.sent.push(action.payload);
                }
            )

            // RESPOND TO REQUEST

            .addCase(
                respondToRequest.fulfilled.type,
                (state: UserState, action: PayloadAction<ITradeRequest>) => {
                    const idx = state.requests.sent.findIndex(
                        (r) => r._id === action.payload._id
                    );
                    if (idx !== -1) {
                        state.requests.sent.splice(idx, 1, action.payload);
                    }
                }
            )

            //CONNECTION

            .addCase(fetchConnection.pending.type, (state: UserState) => {
                state.connectionState = LoadingState.pending;
            })
            .addCase(
                fetchConnection.fulfilled.type,
                (state: UserState, action: PayloadAction<IConnection>) => {
                    state.connectionState = LoadingState.success;
                    state.connections.push(action.payload);
                }
            )
            .addCase(fetchConnection.rejected.type, (state: UserState) => {
                state.connectionState = LoadingState.failed;
            })

            .addDefaultCase((state: UserState) => {});
    },
});

function addUser(state: UserState, action: PayloadAction<User>) {
    state.loginState = LoadingState.success;
    state.signUpState = LoadingState.success;
    state.token = action.payload.token;
    state.name = action.payload.name;
    state.phoneNumber = action.payload.phoneNumber;
    state.userId = action.payload.userId;
}

export const {
    logout,
    setToken,
    setUser,
    setBootState,
    addRequest,
    editRequestResponse,
    setUserAddress,
} = userSlice.actions;
export default userSlice.reducer;
