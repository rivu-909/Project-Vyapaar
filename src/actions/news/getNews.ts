import { createAsyncThunk } from "@reduxjs/toolkit";
import IToken from "../../schema/servicesSchema/IToken";
import fetchNewsServiceCall from "../../services/news/fetchNewsServiceCall";

const getNews = createAsyncThunk(
    "news",
    async (params: IToken, { rejectWithValue }) => {
        try {
            const userData = await fetchNewsServiceCall(params);
            return userData;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default getNews;
