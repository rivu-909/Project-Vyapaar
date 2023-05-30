import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface ButtonProps {
    onPress: (evt: GestureResponderEvent) => void;
    label: string;
}

export default function Button(props: ButtonProps) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                onPress={props.onPress}
                android_ripple={{ color: "grey" }}
            >
                <View style={styles.buttonInnerContainer}>
                    <Text style={styles.buttonText}>{props.label}</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden", // to make the ripple effect outside the container to cut off
    },
    buttonInnerContainer: {
        backgroundColor: "black",
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
});
