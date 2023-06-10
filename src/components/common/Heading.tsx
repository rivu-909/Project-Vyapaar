import { StyleSheet, Text, View } from "react-native";

interface HeadingProps {
    label: string;
}

export default function Heading(props: HeadingProps) {
    return (
        <View style={styles.headingContainer}>
            <Text style={styles.label}> {props.label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
    },
    headingContainer: {
        marginBottom: 28,
        alignItems: "center",
    },
});
