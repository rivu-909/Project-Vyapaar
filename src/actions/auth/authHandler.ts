import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ILoginRequest from "../../schema/servicesSchema/ILoginRequest";
import loginServiceCall from "../../services/auth/loginServiceCall";
import cacheUserToken from "../../utils/cacheUserToken";
import cacheUserData from "../../utils/cacheUserData";
import createError from "../../utils/createError";
import ISignUpRequest from "../../schema/servicesSchema/ISignUpRequest";
import AuthActionType from "../../schema/AuthActionType";
import signUpServiceCall from "../../services/auth/signUpServiceCall";

type ParamsType = (ILoginRequest | ISignUpRequest) & {
    actionType: AuthActionType;
};

const authHandler = createAsyncThunk(
    "authHandler",
    async (params: ParamsType, { rejectWithValue }) => {
        let userData;
        try {
            switch (params.actionType) {
                case AuthActionType.Login:
                    userData = await loginServiceCall(params as ILoginRequest);
                    break;
                case AuthActionType.SignUp:
                    userData = await signUpServiceCall(
                        params as ISignUpRequest
                    );
                    break;
            }

            if (!userData) {
                throw new Error("userData not defined");
            }

            cacheUserToken(userData.token);
            cacheUserData(userData);

            return userData;
        } catch (err) {
            return rejectWithValue(createError(err as AxiosError));
        }
    }
);

export default authHandler;
