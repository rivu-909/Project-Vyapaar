import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getProducts from "../../../actions/product/getProducts";
import LoadingState from "../../../schema/LoadingState";
import Product from "../../../schema/products/Product";
import ProductState from "../../../schema/products/ProductState";

const initialState: ProductState = {
    products: [],
    productsLoadingState: LoadingState.Idle,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // PRODUCT HANDLERS

        addProduct: (state: ProductState, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        updateProduct: (
            state: ProductState,
            action: PayloadAction<Product>
        ) => {
            const idx = state.products.findIndex(
                (p) => p.productId === action.payload.productId
            );
            if (idx !== -1) {
                state.products.splice(idx, 1, action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder

            // GET ALL PRODUCTS

            .addCase(getProducts.pending.type, (state: ProductState) => {
                state.productsLoadingState = LoadingState.Pending;
            })
            .addCase(
                getProducts.fulfilled.type,
                (
                    state: ProductState,
                    action: PayloadAction<Array<Product>>
                ) => {
                    state.productsLoadingState = LoadingState.Success;
                    state.products = action.payload;
                }
            )
            .addCase(getProducts.rejected.type, (state: ProductState) => {
                state.productsLoadingState = LoadingState.Failed;
            })

            .addDefaultCase((state: ProductState) => {});
    },
});

export const { addProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
