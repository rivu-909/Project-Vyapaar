import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import Button from "../common/Button";
import { Dispatch } from "../../store/store";
import signUp from "../../actions/auth/signUp";
import Heading from "../common/Heading";
import Input from "../common/Input";

interface SignUpFormDispatchProps {
    signUpHandler: (
        name: string,
        phoneNumber: string,
        password: string,
        gstin: string
    ) => void;
}

function SignUpForm(props: SignUpFormDispatchProps) {
    const [inputs, setInputs] = React.useState<{
        name: string;
        phoneNumber: string;
        password: string;
        confirmPassword: string;
        gstin: string;
    }>({
        name: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        gstin: "",
    });

    const inputChangeHandler = (
        inputIdentifier: string,
        enteredValue: string
    ) => {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: enteredValue,
            };
        });
    };

    const onSignUp = () => {
        try {
            const response = props.signUpHandler(
                inputs.name,
                inputs.phoneNumber,
                inputs.password,
                inputs.gstin
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={styles.root}>
            <Heading label="Sign Up" />
            <Input
                label="Name"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "name"),
                    value: inputs.name,
                    placeholder: "John",
                }}
            />
            <Input
                label="Phone Number"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "phoneNumber"),
                    value: inputs.phoneNumber,
                    placeholder: "9876543210",
                }}
            />
            <Input
                label="Password"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "password"),
                    value: inputs.password,
                    placeholder: "your password",
                    secureTextEntry: true,
                }}
            />
            <Input
                label="Confirm Password"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(
                        null,
                        "confirmPassword"
                    ),
                    value: inputs.confirmPassword,
                    placeholder: "confirm your password",
                    secureTextEntry: true,
                }}
            />
            <Input
                label="GSTIN"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "gstin"),
                    value: inputs.gstin,
                    placeholder: "Your GSTIN",
                }}
            />
            <Button
                onPress={onSignUp}
                label="SignUp"
                containerStyle={styles.buttonContainerStyle}
                labelStyle={styles.buttonLabelStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        margin: 8,
        marginBottom: 0,
        alignItems: "flex-start",
    },
    buttonContainerStyle: {
        borderRadius: 8,
        backgroundColor: "black",
    },
    buttonLabelStyle: {
        color: "white",
    },
});

function mapDispatch(dispatch: Dispatch): SignUpFormDispatchProps {
    return {
        signUpHandler: (
            name: string,
            phoneNumber: string,
            password: string,
            gstin: string
        ) => {
            dispatch(signUp({ name, phoneNumber, password, gstin }));
        },
    };
}

export default connect(null, mapDispatch)(SignUpForm);
