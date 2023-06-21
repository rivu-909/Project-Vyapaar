import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getNews from "../../../actions/news/getNews";
import LoadingState from "../../../schema/LoadingState";
import IArticle from "../../../schema/news/IArticle";
import NewsState from "../../../schema/news/NewsState";

const initialState: NewsState = {
    articles: [],
    newsLoadingState: LoadingState.idle,
};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET NEWS

            .addCase(getNews.pending.type, (state: NewsState) => {
                state.newsLoadingState = LoadingState.pending;
            })
            .addCase(
                getNews.fulfilled.type,
                (state: NewsState, action: PayloadAction<Array<IArticle>>) => {
                    state.newsLoadingState = LoadingState.success;
                    state.articles = action.payload;
                }
            )
            .addCase(getNews.rejected.type, (state: NewsState) => {
                state.newsLoadingState = LoadingState.failed;
            });
    },
});

export default newsSlice.reducer;
