import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../../schema/User";
import login from "../../../actions/auth/login";
import signUp from "../../../actions/auth/signUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchToken from "../../../actions/auth/fetchToken";

const initialState: User = {
    token: null,
    isLoggedIn: false,
    isLoggingIn: false,
    isSigningUp: false,
    fetchingToken: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state: User) => {
            state.isLoggedIn = false;
            state.token = null;
            AsyncStorage.removeItem("userToken");
        },
    },
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
                    state.token = action.payload;

                    AsyncStorage.setItem("userToken", action.payload);
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
            .addCase(
                signUp.fulfilled.type,
                (state: User, action: PayloadAction<string>) => {
                    console.log("success");
                    state.isSigningUp = false;
                    state.isLoggedIn = true;
                    state.token = action.payload;

                    AsyncStorage.setItem("userToken", action.payload);
                }
            )
            .addCase(signUp.rejected.type, (state: User) => {
                console.log("rejected");
                state.isSigningUp = false;
            })
            .addCase(fetchToken.pending.type, (state: User) => {
                state.fetchingToken = true;
            })
            .addCase(
                fetchToken.fulfilled.type,
                (state: User, action: PayloadAction<string>) => {
                    console.log("success");
                    state.fetchingToken = false;
                    state.isLoggingIn = false;
                    state.isLoggedIn = true;
                    state.token = action.payload;
                }
            )
            .addCase(fetchToken.rejected.type, (state: User) => {
                console.log("rejected");
                state.fetchingToken = false;
            })

            .addDefaultCase((state: User) => {});
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
