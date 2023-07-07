import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Address from "../../../schema/Address";
import AppConfigState from "../../../schema/appConfig/AppConfigState";
import LoadingState from "../../../schema/LoadingState";

interface RequestDetails {
    productId: string;
    tradeId: string;
    userId: string;
}

interface ConnectionDetails {
    userName: string;
    phoneNumber: string;
    address: Address;
}

const initialRequestConfirmDailogState = {
    visible: false,
    productId: null,
    tradeId: null,
    userId: null,
};

const initialIConnectionDailogState = {
    visible: false,
    userName: null,
    phoneNumber: null,
    address: null,
};

const initialState: AppConfigState = {
    requestConfiirmDailog: initialRequestConfirmDailogState,
    connectionDailog: initialIConnectionDailogState,
    bootState: LoadingState.Idle,
};

const appConfigSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // BOOT STATE

        setBootState: (
            state: AppConfigState,
            action: PayloadAction<LoadingState>
        ) => {
            state.bootState = action.payload;
        },

        // REQUEST CONFIRM DAILOG

        onShowRequestConfirmDailog: (
            state: AppConfigState,
            action: PayloadAction<RequestDetails>
        ) => {
            state.requestConfiirmDailog.visible = true;
            state.requestConfiirmDailog.productId = action.payload.productId;
            state.requestConfiirmDailog.tradeId = action.payload.tradeId;
            state.requestConfiirmDailog.userId = action.payload.userId;
        },
        onCloseRequestConfirmDailog: (state: AppConfigState) => {
            state.requestConfiirmDailog.visible = false;
            state.requestConfiirmDailog.productId = null;
            state.requestConfiirmDailog.tradeId = null;
            state.requestConfiirmDailog.userId = null;
        },

        // CONNECTION DAILOG

        onShowConnectionDailog: (
            state: AppConfigState,
            action: PayloadAction<ConnectionDetails>
        ) => {
            state.connectionDailog.visible = true;
            state.connectionDailog.userName = action.payload.userName;
            state.connectionDailog.phoneNumber = action.payload.phoneNumber;
            state.connectionDailog.address = action.payload.address;
        },

        onCloseConnectionDailog: (state: AppConfigState) => {
            state.connectionDailog.visible = false;
        },
    },
});

export const {
    onShowRequestConfirmDailog,
    onCloseRequestConfirmDailog,
    onShowConnectionDailog,
    onCloseConnectionDailog,
    setBootState,
} = appConfigSlice.actions;

export default appConfigSlice.reducer;
