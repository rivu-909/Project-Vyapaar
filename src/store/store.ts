import { configureStore } from "@reduxjs/toolkit";
import user from "./reducer/user/userSlice";

const store = configureStore({
    reducer: {
        user: user,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
