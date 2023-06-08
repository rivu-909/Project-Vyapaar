import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserState from "../../../schema/user/UserState";
import login from "../../../actions/auth/login";
import signUp from "../../../actions/auth/signUp";
import LoadingState from "../../../schema/LoadingState";
import User from "../../../schema/user/User";

const initialState: UserState = {
    token: null,
    name: null,
    userId: null,
    phoneNumber: null,
    loginState: LoadingState.idle,
    signUpState: LoadingState.idle,
    bootState: LoadingState.idle,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // BOOT

        setBootState: (
            state: UserState,
            action: PayloadAction<LoadingState>
        ) => {
            state.bootState = action.payload;
        },

        // USER

        setUser: (state: UserState, action: PayloadAction<User>) => {
            state.name = action.payload.name;
            state.phoneNumber = action.payload.phoneNumber;
            state.userId = action.payload.userId;
        },

        // TOKEN

        setToken: (state: UserState, action: PayloadAction<string>) => {
            state.token = action.payload;
        },

        // LOGOUT

        logout: (state: UserState) => {
            state.loginState = LoadingState.idle;
            state.token = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // LOGIN

            .addCase(login.pending.type, (state: UserState) => {
                state.loginState = LoadingState.pending;
            })
            .addCase(login.fulfilled.type, addUser)
            .addCase(login.rejected.type, (state: UserState) => {
                state.loginState = LoadingState.failed;
            })

            // SIGNUP

            .addCase(signUp.pending.type, (state: UserState) => {
                state.signUpState = LoadingState.pending;
            })
            .addCase(signUp.fulfilled.type, addUser)
            .addCase(signUp.rejected.type, (state: UserState) => {
                state.signUpState = LoadingState.failed;
            })

            .addDefaultCase((state: UserState) => {});
    },
});

function addUser(state: UserState, action: PayloadAction<User>) {
    state.loginState = LoadingState.success;
    state.signUpState = LoadingState.success;
    state.token = action.payload.token;
    state.name = action.payload.name;
    state.phoneNumber = action.payload.phoneNumber;
    state.userId = action.payload.userId;
}

export const { logout, setToken, setUser, setBootState } = userSlice.actions;
export default userSlice.reducer;
