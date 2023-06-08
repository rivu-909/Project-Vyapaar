import { createAsyncThunk } from "@reduxjs/toolkit";
import ILoginRequest from "../../schema/servicesSchema/ILoginRequest";
import loginServiceCall from "../../services/auth/loginServiceCall";
import cacheUserToken from "../../utils/cacheUserToken";
import cacheUserData from "../../utils/cacheUserData";

const login = createAsyncThunk(
    "user/login",
    async (userCred: ILoginRequest, { rejectWithValue }) => {
        try {
            const userData = await loginServiceCall(userCred);
            cacheUserToken(userData.token);
            cacheUserData(userData);
            return userData;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default login;
