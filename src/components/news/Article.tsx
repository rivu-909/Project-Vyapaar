import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Heading from "../common/Heading";
import { useNavigation } from "@react-navigation/native";
import { NewsDetailsScreenNavigationProp } from "../../schema/ReactNavigation";
import IArticle from "../../schema/news/IArticle";

const error404ImageUrl =
    "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png";

interface ArticleProps {
    article: IArticle;
}

export default function Article(props: ArticleProps) {
    const { article } = props;
    const [shouldShowImage, setShouldShowImage] = React.useState<boolean>(true);
    const onError = () => {
        setShouldShowImage(false);
    };
    const publishedDate = new Date(article.publishedAt ?? "");

    const navigation = useNavigation<NewsDetailsScreenNavigationProp>();
    const goToDetailsHandler = () => {
        navigation.navigate("NewsDetails", {
            uri: article.url ?? error404ImageUrl,
        });
    };

    return (
        <Pressable
            onPress={goToDetailsHandler}
            android_ripple={{ color: "grey" }}
        >
            <View style={styles.root}>
                <Heading
                    label={article.title ?? ""}
                    labelStyle={styles.titleLabel}
                    containerStyle={styles.headingContainer}
                />
                {shouldShowImage && article.urlToImage ? (
                    <Image
                        source={{ uri: article.urlToImage ?? error404ImageUrl }}
                        style={styles.imageStyle}
                        onError={onError}
                    />
                ) : null}
                <Text style={styles.subtitle}>{`${
                    article.author ? "- " + article.author : null
                } ${
                    article.publishedAt
                        ? " |  " + publishedDate.toDateString()
                        : null
                }`}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 8,
        paddingHorizontal: 16,
        // flex: 1,
        margin: 4,
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        justifyContent: "space-between",
    },
    headingContainer: {
        marginHorizontal: 0,
        marginVertical: 8,
    },

    titleLabel: {
        fontSize: 16,
    },
    imageStyle: {
        height: 200,
        width: "100%",
        resizeMode: "cover",
        marginBottom: 8,
        borderRadius: 4,
    },
    subtitle: {
        fontFamily: "MerriweatherRegular",
    },
});
