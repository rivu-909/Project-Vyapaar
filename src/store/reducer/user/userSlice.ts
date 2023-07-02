import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserState from "../../../schema/user/UserState";
import LoadingState from "../../../schema/LoadingState";
import User from "../../../schema/user/User";
import ITradeRequest from "../../../schema/user/ITradeRequest";
import fetchConnection from "../../../actions/requests/fetchConnection";
import IConnection from "../../../schema/user/IConnection";
import IError from "../../../schema/IError";
import Address from "../../../schema/Address";
import authHandler from "../../../actions/auth/authHandler";
import getUserTradeRequests from "../../../actions/requests/getReqNConnections";
import ReqNConnections from "../../../schema/user/ReqNConnections";

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
    connections: [],
    authState: LoadingState.Idle,
    reqNConnectionsState: LoadingState.Idle,
    connectionState: LoadingState.Idle,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
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
            state.authState = LoadingState.Idle;
            state.token = null;
        },

        // NEW REQUEST

        addRequest: (
            state: UserState,
            action: PayloadAction<ITradeRequest>
        ) => {
            if (state.userId === action.payload.receiverId) {
                state.requests.received.push(action.payload);
            } else if (state.userId === action.payload.senderId) {
                state.requests.sent.push(action.payload);
            }
        },

        // CHANGE REQUEST STATUS

        editRequestResponse: (
            state: UserState,
            action: PayloadAction<ITradeRequest>
        ) => {
            if (state.userId === action.payload.receiverId) {
                const idx = state.requests.received.findIndex(
                    (r) => r._id === action.payload._id
                );
                if (idx !== -1) {
                    state.requests.received.splice(idx, 1, action.payload);
                }
            } else if (state.userId === action.payload.senderId) {
                const idx = state.requests.sent.findIndex(
                    (r) => r._id === action.payload._id
                );
                if (idx !== -1) {
                    state.requests.sent.splice(idx, 1, action.payload);
                }
            }
        },

        // ADDRESS

        setUserAddress: (state: UserState, action: PayloadAction<Address>) => {
            state.address = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder

            // AUTH

            .addCase(authHandler.pending.type, (state: UserState) => {
                state.authState = LoadingState.Pending;
            })
            .addCase(
                authHandler.fulfilled.type,
                (state: UserState, action: PayloadAction<User>) => {
                    state.token = action.payload.token;
                    state.name = action.payload.name;
                    state.phoneNumber = action.payload.phoneNumber;
                    state.userId = action.payload.userId;
                    state.authState = LoadingState.Success;
                }
            )
            .addCase(
                authHandler.rejected.type,
                (state: UserState, action: PayloadAction<IError>) => {
                    state.authState = LoadingState.Failed;
                }
            )

            // FETCH USER TRADE REQUESTS

            .addCase(getUserTradeRequests.pending.type, (state: UserState) => {
                state.reqNConnectionsState = LoadingState.Pending;
            })
            .addCase(
                getUserTradeRequests.fulfilled.type,
                (state: UserState, action: PayloadAction<ReqNConnections>) => {
                    state.connections = action.payload.connections;
                    state.requests = action.payload.requests;
                    state.reqNConnectionsState = LoadingState.Success;
                }
            )
            .addCase(
                getUserTradeRequests.rejected.type,
                (state: UserState, action: PayloadAction<IError>) => {
                    state.reqNConnectionsState = LoadingState.Failed;
                }
            )

            //CONNECTION

            .addCase(fetchConnection.pending.type, (state: UserState) => {
                state.connectionState = LoadingState.Pending;
            })
            .addCase(
                fetchConnection.fulfilled.type,
                (state: UserState, action: PayloadAction<IConnection>) => {
                    state.connections.push(action.payload);
                    state.connectionState = LoadingState.Success;
                }
            )
            .addCase(fetchConnection.rejected.type, (state: UserState) => {
                state.connectionState = LoadingState.Failed;
            })

            .addDefaultCase((state: UserState) => {});
    },
});

export const {
    logout,
    setToken,
    setUser,
    addRequest,
    editRequestResponse,
    setUserAddress,
} = userSlice.actions;

export default userSlice.reducer;
