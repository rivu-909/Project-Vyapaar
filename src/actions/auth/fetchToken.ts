import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchToken = createAsyncThunk(
    "user/fetchToken",
    async (_, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (token) {
                return token;
            } else {
                throw new Error("Token not stored");
            }
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export default fetchToken;
