import { ActivityIndicator, StyleSheet, View } from "react-native";
import Heading from "./Heading";

interface LoadingOverlayProps {
    message: string;
}

export default function (props: LoadingOverlayProps) {
    return (
        <View style={styles.root}>
            <Heading label={props.message} />
            <ActivityIndicator size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
    },
});
