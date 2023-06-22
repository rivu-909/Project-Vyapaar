import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import getNews from "../../actions/news/getNews";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import ArticlesList from "../../components/news/ArticlesList";
import LoadingState from "../../schema/LoadingState";
import IArticle from "../../schema/news/IArticle";
import { Dispatch, RootState } from "../../store/store";

interface NewsStateProps {
    token: string;
    newsLoadingState: LoadingState;
    articles: Array<IArticle>;
}

interface NewsDispatchProps {
    fetchNews: (token: string) => void;
}

function News(props: NewsStateProps & NewsDispatchProps) {
    React.useEffect(() => {
        if (props.newsLoadingState !== LoadingState.success)
            props.fetchNews(props.token);
    }, []);

    return (
        <View style={styles.root}>
            {props.newsLoadingState === LoadingState.pending ? (
                <LoadingOverlay message="Loading news..." />
            ) : (
                <ArticlesList articles={props.articles} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

function mapState(state: RootState): NewsStateProps {
    return {
        token: state.user.token ?? "",
        articles: state.news.articles,
        newsLoadingState: state.news.newsLoadingState,
    };
}

function mapDispatch(dispatch: Dispatch): NewsDispatchProps {
    return {
        fetchNews: (token: string) => {
            dispatch(getNews({ token }));
        },
    };
}

export default connect(mapState, mapDispatch)(News);
