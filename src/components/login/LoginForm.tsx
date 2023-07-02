import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import Button from "../common/Button";
import { Dispatch, RootState } from "../../store/store";
import authHandler from "../../actions/auth/authHandler";
import Heading from "../common/Heading";
import Input from "../common/Input";
import validatePasswordCriteria from "../../utils/validatePasswordCriteria";
import LoadingState from "../../schema/LoadingState";
import LoadingOverlay from "../common/LoadingOverlay";
import AuthActionType from "../../schema/AuthActionType";

interface LogInFormProps {
    goToSignUpPage: () => void;
}

interface LogInFormStateProps {
    phoneNumber: string;
    loginState: LoadingState;
}

interface LogInFormDispatchProps {
    loginHandler: (phoneNumber: string, password: string) => Promise<any>;
}

interface IInput {
    value: string;
    isValid: boolean;
}

function LogInForm(
    props: LogInFormProps & LogInFormStateProps & LogInFormDispatchProps
) {
    const [inputs, setInputs] = React.useState<{
        phoneNumber: IInput;
        password: IInput;
    }>({
        phoneNumber: { value: props.phoneNumber, isValid: true },
        password: { value: "", isValid: true },
    });

    const inputChangeHandler = (
        inputIdentifier: string,
        enteredValue: string
    ) => {
        setInputs((currentInputs) => ({
            ...currentInputs,
            [inputIdentifier]: { value: enteredValue, isValid: true },
        }));
    };

    const onLogin = React.useCallback(() => {
        const regExpPhone = /^\d{10}$/;
        if (!regExpPhone.test(inputs.phoneNumber.value)) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                phoneNumber: { value: "", isValid: false },
            }));
            return;
        }

        if (!validatePasswordCriteria(inputs.password.value)) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                password: { value: "", isValid: false },
            }));
            return;
        }

        props
            .loginHandler(inputs.phoneNumber.value, inputs.password.value)
            .then(({ payload }) => {
                if (payload.validationError) {
                    setInputs((currentInputs) => ({
                        ...currentInputs,
                        [payload.validationPath]: { value: "", isValid: false },
                    }));
                }
            });
    }, [inputs]);

    return (
        <>
            {props.loginState === LoadingState.Pending ? (
                <LoadingOverlay message="Logging you in..." />
            ) : (
                <View style={styles.root}>
                    <Heading label="Log In" />
                    <Input
                        label="Phone Number"
                        textInputConfig={{
                            onChangeText: inputChangeHandler.bind(
                                null,
                                "phoneNumber"
                            ),
                            value: inputs.phoneNumber.value,
                            placeholder: "Your 10 digit phone number",
                        }}
                        invalid={!inputs.phoneNumber.isValid}
                    />
                    <Input
                        label="Password"
                        textInputConfig={{
                            onChangeText: inputChangeHandler.bind(
                                null,
                                "password"
                            ),
                            value: inputs.password.value,
                            placeholder: "Your password",
                            secureTextEntry: true,
                        }}
                        invalid={!inputs.password.isValid}
                    />
                    <Button
                        onPress={onLogin}
                        label="Login"
                        containerStyle={styles.buttonContainerStyle}
                        labelStyle={styles.buttonLabelStyle}
                        androidRippleColor="#505050"
                    />
                    <Button
                        onPress={props.goToSignUpPage}
                        label="Create an account"
                        containerStyle={styles.signUpButtonContainer}
                        androidRippleColor="#989898"
                    />
                </View>
            )}
        </>
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
    signUpButtonContainer: {
        borderRadius: 8,
        backgroundColor: "#D3D3D3",
    },
    buttonLabelStyle: {
        color: "white",
    },
});

function mapState(state: RootState): LogInFormStateProps {
    const user = state.user;
    return {
        phoneNumber: user.phoneNumber ?? "",
        loginState: user.authState,
    };
}

function mapDispatch(dispatch: Dispatch): LogInFormDispatchProps {
    return {
        loginHandler: (phoneNumber: string, password: string): Promise<any> => {
            return dispatch(
                authHandler({
                    phoneNumber,
                    password,
                    actionType: AuthActionType.Login,
                })
            );
        },
    };
}

export default connect(mapState, mapDispatch)(LogInForm);
