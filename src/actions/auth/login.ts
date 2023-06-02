import { createAsyncThunk } from "@reduxjs/toolkit";
import ILoginRequest from "../../schema/servicesSchema/ILoginRequest";
import loginServiceCall from "../../services/auth/loginServiceCall";

const login = createAsyncThunk(
    "user/login",
    async (userCred: ILoginRequest, { rejectWithValue }) => {
        try {
            const data = await loginServiceCall(userCred);
            if (data.token) {
                return data.token;
            } else {
                throw new Error("Login failed");
            }
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default login;
