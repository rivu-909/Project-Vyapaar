import { createAsyncThunk } from "@reduxjs/toolkit";
import ISendTradeRequest from "../../schema/servicesSchema/ISendTradeRequest";
import sendTradeRequestServiceCall from "../../services/requests/sendTradeRequestServiceCall";
import { publish } from "../../store/ably";

const sendTradeRequests = createAsyncThunk(
    "sendRequest",
    async (params: ISendTradeRequest, { rejectWithValue }) => {
        try {
            const tradeRequest = await sendTradeRequestServiceCall(params);
            publish(params.token, "send_request", tradeRequest);
            return tradeRequest;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default sendTradeRequests;
