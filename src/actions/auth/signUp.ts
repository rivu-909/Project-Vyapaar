import { createAsyncThunk } from "@reduxjs/toolkit";
import ISignUpRequest from "../../schema/servicesSchema/ISignUpRequest";
import signUpServiceCall from "../../services/auth/signUpServiceCall";

const signUp = createAsyncThunk(
    "user/signUp",
    async (userCred: ISignUpRequest) => {
        try {
            const response = await signUpServiceCall(userCred);
            return response;
        } catch (err) {
            console.log(err);
        }
    }
);

export default signUp;
