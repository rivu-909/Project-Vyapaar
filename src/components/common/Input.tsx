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
        <View>
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
    label: {
        fontSize: 16,
        margin: 4,
    },
    input: {
        padding: 4,
        borderColor: "black",
        borderWidth: 1,
        minWidth: 250,
        borderRadius: 4,
        marginBottom: 12,
    },
    errorLabel: {
        color: "red",
    },
    errorInput: {
        borderColor: "red",
    },
});
