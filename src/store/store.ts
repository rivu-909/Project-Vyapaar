import { configureStore } from "@reduxjs/toolkit";
import user from "./reducer/user/userSlice";
import products from "./reducer/products/productsSlice";

const store = configureStore({
    reducer: {
        user: user,
        products: products,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
