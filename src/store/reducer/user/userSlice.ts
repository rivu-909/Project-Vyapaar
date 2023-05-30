import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../../schema/User";
import login from "../../../actions/auth/login";
import signUp from "../../../actions/auth/signUp";

const initialState: User = {
    token: null,
    isLoggedIn: false,
    isLoggingIn: false,
    isSigningUp: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending.type, (state: User) => {
                state.isLoggingIn = true;
            })
            .addCase(
                login.fulfilled.type,
                (state: User, action: PayloadAction<string>) => {
                    console.log("success");
                    state.isLoggingIn = false;
                    state.isLoggedIn = true;
                    console.log(action.payload);
                    state.token = action.payload;
                }
            )
            .addCase(login.rejected.type, (state: User) => {
                console.log("rejected");
                state.isLoggingIn = false;
                state.isLoggedIn = false;
            })
            .addCase(signUp.pending.type, (state: User) => {
                state.isSigningUp = true;
            })
            .addCase(signUp.fulfilled.type, (state: User) => {
                state.isSigningUp = false;
            })
            .addCase(signUp.rejected.type, (state: User) => {
                state.isSigningUp = false;
            })

            .addDefaultCase((state: User) => {});
    },
});

export default userSlice.reducer;
