import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Label from "../common/Label";
import { useNavigation } from "@react-navigation/native";
import { NewsDetailsScreenNavigationProp } from "../../schema/ReactNavigation";
import IArticle from "../../schema/news/IArticle";
import color from "../../colorPalette";

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
                <Label
                    label={article.title ?? ""}
                    labelStyle={styles.titleLabel}
                    containerStyle={styles.headingContainer}
                    numberOfLines={3}
                />
                {shouldShowImage && article.urlToImage ? (
                    <Image
                        source={{ uri: article.urlToImage ?? error404ImageUrl }}
                        style={styles.imageStyle}
                        onError={onError}
                    />
                ) : null}
                <Label
                    labelStyle={styles.subtitle}
                    label={`${article.author ? article.author : null} ${
                        article.publishedAt
                            ? " |  " + publishedDate.toDateString()
                            : null
                    }`}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 8,
        marginBottom: 8,
        marginHorizontal: 12,
        backgroundColor: color.theme100,
        borderRadius: 12,
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
        fontFamily: "Lora",
    },
});
