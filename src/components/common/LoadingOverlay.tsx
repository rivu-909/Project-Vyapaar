import {
    ActivityIndicator,
    StyleSheet,
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";
import Label from "./Label";

interface LoadingOverlayProps {
    message: string;
    style?: StyleProp<ViewStyle>;
    labelStyles?: StyleProp<TextStyle>;
}

export default function (props: LoadingOverlayProps) {
    return (
        <View style={[styles.root, props.style]}>
            <Label label={props.message} labelStyle={styles.labelStyle} />
            <ActivityIndicator size={64} style={styles.activityStyle} />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    labelStyle: {
        fontSize: 28,
        fontWeight: "500",
    },
    activityStyle: {
        marginTop: 20,
    },
});
