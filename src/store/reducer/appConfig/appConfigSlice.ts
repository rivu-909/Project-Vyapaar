import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AppConfigState from "../../../schema/appConfig/AppConfigState";

interface RequestDetails {
    productId: string;
    tradeId: string;
    userId: string;
}

interface ConnectionDetails {
    userName: string;
    phoneNumber: string;
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
};

const initialState: AppConfigState = {
    requestConfiirmDailog: initialRequestConfirmDailogState,
    connectionDailog: initialIConnectionDailogState,
};

const appConfigSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
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
} = appConfigSlice.actions;

export default appConfigSlice.reducer;
