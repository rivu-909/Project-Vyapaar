import { createAsyncThunk } from "@reduxjs/toolkit";
import IFetchProductDetailsRequest from "../../schema/servicesSchema/IFetchProductDetailsRequest";
import fetchProductDetailsServiceCall from "../../services/products/fetchProductDetailsServiceCall";

const getProductDetails = createAsyncThunk(
    "productDetails/all",
    async (params: IFetchProductDetailsRequest, { rejectWithValue }) => {
        try {
            const product = await fetchProductDetailsServiceCall(params);
            return product;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default getProductDetails;
