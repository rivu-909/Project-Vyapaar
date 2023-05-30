import React from "react";
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
        password: string
    ) => void;
}

function SignUpForm(props: SignUpFormDispatchProps) {
    const [inputs, setInputs] = React.useState<{
        name: string;
        phoneNumber: string;
        password: string;
        confirmPassword: string;
    }>({
        name: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
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
                inputs.password
            );
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Heading label="Please sign up" />
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
            <Button onPress={onSignUp} label="SignUp" />
        </>
    );
}

function mapDispatch(dispatch: Dispatch): SignUpFormDispatchProps {
    return {
        signUpHandler: (
            name: string,
            phoneNumber: string,
            password: string
        ) => {
            dispatch(signUp({ name, phoneNumber, password }));
        },
    };
}

export default connect(null, mapDispatch)(SignUpForm);