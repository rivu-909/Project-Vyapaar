import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getProducts from "../../../actions/product/getProducts";
import Product from "../../../schema/products/Product";
import Products from "../../../schema/products/Products";

const initialState: Products = {
    products: [],
    isLoading: false,
    isFetched: false,
};

const productsSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending.type, (state: Products) => {
                state.isLoading = true;
            })
            .addCase(
                getProducts.fulfilled.type,
                (state: Products, action: PayloadAction<Array<Product>>) => {
                    console.log("success");
                    state.isLoading = false;
                    state.isFetched = true;
                    state.products = action.payload;
                }
            )
            .addCase(getProducts.rejected.type, (state: Products) => {
                console.log("rejected");
                state.isLoading = false;
            });
    },
});

export default productsSlice.reducer;
