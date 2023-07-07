import {
    StyleSheet,
    Text,
    View,
    StyleProp,
    TextStyle,
    ViewStyle,
} from "react-native";
import color from "../../colorPalette";

interface HeadingProps {
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    numberOfLines?: number;
}

export default function Label(props: HeadingProps) {
    return (
        <View style={[styles.root, props.containerStyle]}>
            <Text
                style={[styles.label, props.labelStyle]}
                numberOfLines={props.numberOfLines ?? 1}
            >
                {props.label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        margin: 4,
    },
    label: {
        fontFamily: "Lora",
        color: color.dark800,
        fontSize: 12,
    },
});
