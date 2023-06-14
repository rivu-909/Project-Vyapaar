import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";

interface InputProps {
    label: string;
    textInputConfig: TextInputProps;
    invalid?: boolean;
}

export default function Input(props: InputProps) {
    return (
        <View style={styles.root}>
            <Text style={[styles.label, !!props.invalid && styles.errorLabel]}>
                {props.label}
            </Text>
            <TextInput
                style={[styles.input, !!props.invalid && styles.errorInput]}
                placeholderTextColor="grey"
                {...props.textInputConfig}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        marginHorizontal: 8,
        marginVertical: 12,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        fontFamily: "MerriweatherLight",
    },
    input: {
        paddingBottom: 8,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        minWidth: 250,
        fontFamily: "MerriweatherLight",
    },
    errorLabel: {
        color: "red",
    },
    errorInput: {
        borderColor: "red",
    },
});
