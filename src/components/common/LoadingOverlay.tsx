import {
    ActivityIndicator,
    StyleSheet,
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";
import Heading from "./Heading";

interface LoadingOverlayProps {
    message: string;
    style?: StyleProp<ViewStyle>;
    labelStyles?: StyleProp<TextStyle>;
}

export default function (props: LoadingOverlayProps) {
    return (
        <View style={[styles.root, props.style]}>
            <Heading label={props.message} />
            <ActivityIndicator size="large" style={styles.activityStyle} />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    activityStyle: {
        marginTop: 20,
    },
});
