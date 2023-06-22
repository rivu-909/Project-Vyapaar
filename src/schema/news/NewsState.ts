import LoadingState from "../LoadingState";
import IArticle from "./IArticle";

export default interface NewsState {
    newsLoadingState: LoadingState;
    articles: Array<IArticle>;
}
