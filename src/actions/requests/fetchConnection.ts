import { createAsyncThunk } from "@reduxjs/toolkit";
import IFetchConnection from "../../schema/servicesSchema/IFetchConnection";
import fetchConnectionServiceCall from "../../services/requests/fetchConnectionServiceCall";

const fetchConnection = createAsyncThunk(
    "connection",
    async (params: IFetchConnection, { rejectWithValue, getState }) => {
        try {
            const connection = await fetchConnectionServiceCall(params);
            return connection;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default fetchConnection;
