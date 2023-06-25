import { createAsyncThunk } from "@reduxjs/toolkit";
import IFetchConnection from "../../schema/servicesSchema/IFetchConnection";
import fetchConnectionServiceCall from "../../services/requests/fetchConnectionServiceCall";
import { onShowConnectionDailog } from "../../store/reducer/appConfig/appConfigSlice";

const fetchConnection = createAsyncThunk(
    "connection",
    async (params: IFetchConnection, { rejectWithValue, dispatch }) => {
        try {
            const connection = await fetchConnectionServiceCall(params);
            dispatch(
                onShowConnectionDailog({
                    userName: connection.name,
                    phoneNumber: connection.phoneNumber,
                })
            );
            return connection;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default fetchConnection;
