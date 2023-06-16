import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AppConfigState from "../../../schema/appConfig/AppConfigState";

interface RequestDetails {
    productId: string;
    tradeId: string;
    userId: string;
}

const initialRequestConfirmDailogState = {
    visible: false,
    productId: null,
    tradeId: null,
    userId: null,
};

const initialState: AppConfigState = {
    requestConfiirmDailog: initialRequestConfirmDailogState,
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
    },
});

export const { onShowRequestConfirmDailog, onCloseRequestConfirmDailog } =
    appConfigSlice.actions;
export default appConfigSlice.reducer;
