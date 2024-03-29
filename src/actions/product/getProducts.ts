import { createAsyncThunk } from "@reduxjs/toolkit";
import IToken from "../../schema/servicesSchema/IToken";
import fetchProductsServiceCall from "../../services/products/fetchProductsServiceCall";

const getProducts = createAsyncThunk(
    "products/all",
    async (params: IToken, { rejectWithValue }) => {
        try {
            const products = await fetchProductsServiceCall(params);
            return products;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default getProducts;
