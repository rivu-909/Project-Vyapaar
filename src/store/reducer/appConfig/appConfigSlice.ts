import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AppConfigState from "../../../schema/appConfig/AppConfigState";
import ITrade from "../../../schema/products/ITrade";
import TradeType from "../../../schema/products/TradeType";

interface TradeDetails {
    productId: string;
    tradeType: TradeType;
    trade?: ITrade;
}

const initialTradeDailogProp = {
    visible: false,
    productId: "",
    tradeType: TradeType.Ask,
    trade: null,
};

const initialState: AppConfigState = {
    tradeDailog: initialTradeDailogProp,
};

const appConfigSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
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
            state.tradeDailog = initialTradeDailogProp;
        },
    },
});

export const { onTradeDailogClose, onShowTradeDailog } = appConfigSlice.actions;
export default appConfigSlice.reducer;
