import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AppConfigState from "../../../schema/appConfig/AppConfigState";
import ITrade from "../../../schema/products/ITrade";
import TradeType from "../../../schema/products/TradeType";

interface TradeDetails {
    productId: string;
    tradeType: TradeType;
    trade?: ITrade;
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

const initialState: AppConfigState = {
    tradeDailog: initialTradeDailogState,
    productDailog: initialProductDailogState,
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
    },
});

export const {
    onTradeDailogClose,
    onShowTradeDailog,
    onShowProductDailog,
    onCloseProductDailog,
} = appConfigSlice.actions;
export default appConfigSlice.reducer;
