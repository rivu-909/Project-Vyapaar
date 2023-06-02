import { createAsyncThunk } from "@reduxjs/toolkit";
import ISignUpRequest from "../../schema/servicesSchema/ISignUpRequest";
import signUpServiceCall from "../../services/auth/signUpServiceCall";

const signUp = createAsyncThunk(
    "user/signUp",
    async (userCred: ISignUpRequest, { rejectWithValue }) => {
        try {
            const data = await signUpServiceCall(userCred);
            if (data.token) {
                return data.token;
            } else {
                throw new Error("Sign up failed");
            }
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default signUp;
