import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    Text,
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";

interface ButtonProps {
    onPress: (evt: GestureResponderEvent) => void;
    label: string;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    androidRippleColor?: string;
}

export default function Button(props: ButtonProps) {
    return (
        <View style={[styles.buttonOuterContainer, props.containerStyle]}>
            <Pressable
                onPress={props.onPress}
                android_ripple={{ color: props.androidRippleColor }}
            >
                <View style={styles.buttonInnerContainer}>
                    <Text style={[styles.buttonText, props.labelStyle]}>
                        {props.label}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        margin: 4,
        overflow: "hidden", // to make the ripple effect outside the container to cut off
        elevation: 2,
    },
    buttonInnerContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    buttonText: {
        textAlign: "center",
        fontFamily: "MerriweatherRegular",
    },
});
