import { StyleSheet, View, ScrollView } from "react-native";
import IArticle from "../../schema/news/IArticle";
import Article from "./Article";

interface ArticlesListProps {
    articles: Array<IArticle>;
}

function generateRandom() {
    return Math.random().toString() + new Date().toString();
}

export default function ArticlesList(props: ArticlesListProps) {
    return (
        <ScrollView>
            <View style={styles.root}>
                {props.articles.map((article) => (
                    <Article article={article} key={generateRandom()} />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});
