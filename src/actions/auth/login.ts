import { createAsyncThunk } from "@reduxjs/toolkit";
import ILoginRequest from "../../schema/servicesSchema/ILoginRequest";
import loginServiceCall from "../../services/auth/loginServiceCall";

const login = createAsyncThunk(
    "user/login",
    async (userCred: ILoginRequest) => {
        try {
            const response = await loginServiceCall(userCred);
            return response;
        } catch (err) {
            console.log(err);
        }
    }
);

export default login;
