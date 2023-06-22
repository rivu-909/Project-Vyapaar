import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import {
    NewsDetailsScreenNavigationProp,
    NewsDetailsScreenRouteProp,
} from "../../schema/ReactNavigation";

interface NewsDetailsProps {
    navigation: NewsDetailsScreenNavigationProp;
    route: NewsDetailsScreenRouteProp;
}

export default function NewsDetails(props: NewsDetailsProps) {
    const { uri } = props.route.params;
    return <WebView style={styles.root} source={{ uri }}></WebView>;
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});
