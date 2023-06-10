import { createAsyncThunk } from "@reduxjs/toolkit";
import GetProductDetailsActionType from "../../schema/GetProductDetailsActionType";
import ICreateTradeRequest from "../../schema/servicesSchema/ICreateTradeRequest";
import IFetchProductDetailsRequest from "../../schema/servicesSchema/IFetchProductDetailsRequest";
import fetchProductDetailsServiceCall from "../../services/products/fetchProductDetailsServiceCall";
import createTradeServiceCall from "../../services/trade/createTradeServiceCall";

type ParamsType = (IFetchProductDetailsRequest | ICreateTradeRequest) & {
    actionType: GetProductDetailsActionType;
};

const getProductDetails = createAsyncThunk(
    "productDetails/all",
    async (params: ParamsType, { rejectWithValue }) => {
        let product;
        try {
            switch (params.actionType) {
                case GetProductDetailsActionType.CreateTrade: {
                    product = await createTradeServiceCall(
                        params as ICreateTradeRequest
                    );
                    break;
                }
                default: {
                    product = await fetchProductDetailsServiceCall(
                        params as IFetchProductDetailsRequest
                    );
                    break;
                }
            }
            return product;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default getProductDetails;
