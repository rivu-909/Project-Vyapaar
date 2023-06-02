import { createAsyncThunk } from "@reduxjs/toolkit";
import IFetchProductRequest from "../../schema/servicesSchema/IFetchProductRequest";
import fetchProductsServiceCall from "../../services/products/fetchProductsServiceCall";

const getProducts = createAsyncThunk(
    "products/all",
    async (params: IFetchProductRequest, { rejectWithValue }) => {
        try {
            const response = await fetchProductsServiceCall(params);
            if (response?.data.products) {
                return response.data.products;
            } else {
                throw new Error("products undefined");
            }
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default getProducts;
