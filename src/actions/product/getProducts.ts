import { createAsyncThunk } from "@reduxjs/toolkit";
import IFetchProductRequest from "../../schema/servicesSchema/IFetchProductRequest";
import fetchProductsServiceCall from "../../services/products/fetchProductsServiceCall";

const getProducts = createAsyncThunk(
    "products/all",
    async (params: IFetchProductRequest, { rejectWithValue }) => {
        try {
            const products = await fetchProductsServiceCall(params);
            return products;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default getProducts;
