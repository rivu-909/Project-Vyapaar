import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";

interface ButtonProps {
    onPress: (evt: GestureResponderEvent) => void;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    children: React.ReactNode;
    androidRippleColor?: string;
}

export default function IconButton(props: ButtonProps) {
    return (
        <View style={[styles.buttonOuterContainer, props.containerStyle]}>
            <Pressable
                onPress={props.onPress}
                android_ripple={{ color: props.androidRippleColor }}
            >
                <View style={styles.buttonInnerContainer}>
                    {props.children}
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        overflow: "hidden", // to make the ripple effect outside the container to cut of
        alignItems: "center",
        justifyContent: "center",
    },
    buttonInnerContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
});
