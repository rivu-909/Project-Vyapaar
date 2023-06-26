import { createAsyncThunk } from "@reduxjs/toolkit";
import IRespondToRequest from "../../schema/servicesSchema/IRespondToRequest";
import respondToRequestServiceCall from "../../services/requests/respondToRequestServiceCall";

const respondToRequest = createAsyncThunk(
    "respondToRequest",
    async (params: IRespondToRequest, { rejectWithValue }) => {
        try {
            const tradeRequest = await respondToRequestServiceCall(params);
            return tradeRequest;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default respondToRequest;