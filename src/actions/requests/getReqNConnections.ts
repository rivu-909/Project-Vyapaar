import { createAsyncThunk } from "@reduxjs/toolkit";
import IToken from "../../schema/servicesSchema/IToken";
import fetchUserTradeRequestsServiceCall from "../../services/requests/fetchReqNConnectionsServiceCall";

const getReqNConnections = createAsyncThunk(
    "tradeRequest",
    async (params: IToken, { rejectWithValue }) => {
        try {
            const userData = await fetchUserTradeRequestsServiceCall(params);
            return userData;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default getReqNConnections;
