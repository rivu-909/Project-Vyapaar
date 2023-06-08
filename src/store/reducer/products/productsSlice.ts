import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getProducts from "../../../actions/product/getProducts";
import LoadingState from "../../../schema/LoadingState";
import Product from "../../../schema/products/Product";
import ProductState from "../../../schema/products/ProductState";

const initialState: ProductState = {
    products: [],
    productsLoadingState: LoadingState.idle,
};

const productsSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // GET ALL PRODUCTS

            .addCase(getProducts.pending.type, (state: ProductState) => {
                state.productsLoadingState = LoadingState.pending;
            })
            .addCase(
                getProducts.fulfilled.type,
                (
                    state: ProductState,
                    action: PayloadAction<Array<Product>>
                ) => {
                    state.productsLoadingState = LoadingState.success;
                    state.products = action.payload;
                }
            )
            .addCase(getProducts.rejected.type, (state: ProductState) => {
                state.productsLoadingState = LoadingState.failed;
            });
    },
});

export default productsSlice.reducer;
