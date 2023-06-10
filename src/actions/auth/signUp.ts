import { createAsyncThunk } from "@reduxjs/toolkit";
import ISignUpRequest from "../../schema/servicesSchema/ISignUpRequest";
import signUpServiceCall from "../../services/auth/signUpServiceCall";
import cacheUserData from "../../utils/cacheUserData";
import cacheUserToken from "../../utils/cacheUserToken";

const signUp = createAsyncThunk(
    "user/signUp",
    async (userCred: ISignUpRequest, { rejectWithValue }) => {
        try {
            const userData = await signUpServiceCall(userCred);
            cacheUserToken(userData.token);
            cacheUserData(userData);
            return userData;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default signUp;
