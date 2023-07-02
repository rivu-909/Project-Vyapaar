import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ProductActionType from "../../schema/ProductActionType";
import ICreateProductRequest from "../../schema/servicesSchema/ICreateProductRequest";
import ICreateTradeRequest from "../../schema/servicesSchema/ICreateTradeRequest";
import IUpdateTradeRequest from "../../schema/servicesSchema/IUpdateTradeRequest";
import createProductServiceCall from "../../services/products/createProductServiceCall";
import createTradeServiceCall from "../../services/trade/createTradeServiceCall";
import updateTradeServiceCall from "../../services/trade/updateTradeServiceCall";
import { publish } from "../../store/ably";
import cacheUserAddress from "../../utils/cacheUserAddress";
import createError from "../../utils/createError";

type ParamsType = (
    | ICreateTradeRequest
    | IUpdateTradeRequest
    | ICreateProductRequest
) & {
    actionType: ProductActionType;
};

const productHandler = createAsyncThunk(
    "product",
    async (params: ParamsType, { rejectWithValue }) => {
        let product;
        try {
            switch (params.actionType) {
                case ProductActionType.CreateProduct: {
                    product = await createProductServiceCall(
                        params as ICreateProductRequest
                    );
                    publish(params.token, "create_product", product);
                    product = null;
                    break;
                }
                case ProductActionType.CreateTrade: {
                    product = await createTradeServiceCall(
                        params as ICreateTradeRequest
                    );
                    publish(params.token, "create_trade", product);
                    cacheUserAddress((params as ICreateTradeRequest).address);
                    break;
                }
                case ProductActionType.UpdateTrade: {
                    product = await updateTradeServiceCall(
                        params as IUpdateTradeRequest
                    );
                    publish(params.token, "update_trade", product);
                    cacheUserAddress((params as ICreateTradeRequest).address);
                    break;
                }
            }
            return product;
        } catch (err) {
            return rejectWithValue(createError(err as AxiosError));
        }
    }
);

export default productHandler;
