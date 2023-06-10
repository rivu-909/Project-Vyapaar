import { createAsyncThunk } from "@reduxjs/toolkit";
import GetProductDetailsActionType from "../../schema/GetProductDetailsActionType";
import ICreateTradeRequest from "../../schema/servicesSchema/ICreateTradeRequest";
import IFetchProductDetailsRequest from "../../schema/servicesSchema/IFetchProductDetailsRequest";
import IUpdateTradeRequest from "../../schema/servicesSchema/IUpdateTradeRequest";
import fetchProductDetailsServiceCall from "../../services/products/fetchProductDetailsServiceCall";
import createTradeServiceCall from "../../services/trade/createTradeServiceCall";
import updateTradeServiceCall from "../../services/trade/updateTradeServiceCall";

type ParamsType = (
    | IFetchProductDetailsRequest
    | ICreateTradeRequest
    | IUpdateTradeRequest
) & {
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
                case GetProductDetailsActionType.UpdateTrade: {
                    product = await updateTradeServiceCall(
                        params as IUpdateTradeRequest
                    );
                }
                case GetProductDetailsActionType.FetchProduct: {
                    product = await fetchProductDetailsServiceCall(
                        params as IFetchProductDetailsRequest
                    );
                    break;
                }
                default: {
                    product = {};
                }
            }
            return product;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default getProductDetails;
