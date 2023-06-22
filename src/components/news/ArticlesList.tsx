import { StyleSheet, View, ScrollView } from "react-native";
import IArticle from "../../schema/news/IArticle";
import Article from "./Article";

interface ArticlesListProps {
    articles: Array<IArticle>;
}

export default function ArticlesList(props: ArticlesListProps) {
    return (
        <ScrollView>
            <View style={styles.root}>
                {props.articles.map((article) => (
                    <Article article={article} key={article.publishedAt} />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 8,
    },
});
