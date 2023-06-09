import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getProductDetails from "../../../actions/product/getProductDetails";
import getProducts from "../../../actions/product/getProducts";
import LoadingState from "../../../schema/LoadingState";
import Product from "../../../schema/products/Product";
import ProductState from "../../../schema/products/ProductState";

const initialState: ProductState = {
    products: [],
    productsLoadingState: LoadingState.idle,
    productDetailsLoadingState: LoadingState.idle,
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
            })

            // GET PRODUCT DETAILS

            .addCase(getProductDetails.pending.type, (state: ProductState) => {
                state.productDetailsLoadingState = LoadingState.pending;
            })
            .addCase(
                getProductDetails.fulfilled.type,
                (
                    state: ProductState,
                    action: PayloadAction<Product | null>
                ) => {
                    state.productDetailsLoadingState = LoadingState.success;

                    if (!action.payload) {
                        return;
                    }
                    const productIndex = state.products.findIndex(
                        (p) => p.productId === action.payload!.productId
                    );
                    state.products.splice(productIndex, 1, action.payload);
                }
            )
            .addCase(getProductDetails.rejected.type, (state: ProductState) => {
                state.productDetailsLoadingState = LoadingState.failed;
            });
    },
});

export default productsSlice.reducer;
