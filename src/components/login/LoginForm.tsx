import React from "react";
import { connect } from "react-redux";
import Button from "../common/Button";
import { Dispatch } from "../../store/store";
import login from "../../actions/auth/login";
import Heading from "../common/Heading";
import Input from "../common/Input";

interface LogInFormDispatchProps {
    loginHandler: (phoneNumber: string, password: string) => void;
}

function LogInForm(props: LogInFormDispatchProps) {
    const [inputs, setInputs] = React.useState<{
        phoneNumber: string;
        password: string;
    }>({
        phoneNumber: "",
        password: "",
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

    const onLogin = () => {
        try {
            const response = props.loginHandler(
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
            <Heading label="Already have an account?" />
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
            <Button onPress={onLogin} label="Login" />
        </>
    );
}

function mapDispatch(dispatch: Dispatch): LogInFormDispatchProps {
    return {
        loginHandler: (phoneNumber: string, password: string) => {
            dispatch(login({ phoneNumber, password }));
        },
    };
}

export default connect(null, mapDispatch)(LogInForm);
