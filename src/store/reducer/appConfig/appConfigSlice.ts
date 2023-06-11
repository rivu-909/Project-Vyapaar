import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AppConfigState from "../../../schema/appConfig/AppConfigState";
import ITrade from "../../../schema/products/ITrade";
import TradeType from "../../../schema/products/TradeType";

interface TradeDetails {
    productId: string;
    tradeType: TradeType;
    trade?: ITrade;
}

interface RequestDetails {
    productId: string;
    tradeId: string;
    userId: string;
}

const initialTradeDailogState = {
    visible: false,
    productId: "",
    tradeType: TradeType.Ask,
    trade: null,
};

const initialProductDailogState = {
    visible: false,
};

const initialRequestConfirmDailogState = {
    visible: false,
    productId: null,
    tradeId: null,
    userId: null,
};

const initialState: AppConfigState = {
    tradeDailog: initialTradeDailogState,
    productDailog: initialProductDailogState,
    requestConfiirmDailog: initialRequestConfirmDailogState,
};

const appConfigSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // TRADE DAILOG
        onShowTradeDailog: (
            state: AppConfigState,
            action: PayloadAction<TradeDetails>
        ) => {
            if (action.payload) {
                state.tradeDailog.productId = action.payload.productId;
                state.tradeDailog.tradeType = action.payload.tradeType;
                state.tradeDailog.trade = action.payload.trade ?? null;
            }
            state.tradeDailog.visible = true;
        },
        onTradeDailogClose: (state: AppConfigState) => {
            state.tradeDailog = initialTradeDailogState;
        },

        // PRODUCT DAILOG
        onShowProductDailog: (state: AppConfigState) => {
            state.productDailog.visible = true;
        },
        onCloseProductDailog: (state: AppConfigState) => {
            state.productDailog.visible = false;
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
    },
});

export const {
    onTradeDailogClose,
    onShowTradeDailog,
    onShowProductDailog,
    onCloseProductDailog,
    onShowRequestConfirmDailog,
    onCloseRequestConfirmDailog,
} = appConfigSlice.actions;
export default appConfigSlice.reducer;
