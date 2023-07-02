import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import Button from "../common/Button";
import { Dispatch, RootState } from "../../store/store";
import Heading from "../common/Heading";
import Input from "../common/Input";
import validatePasswordCriteria from "../../utils/validatePasswordCriteria";
import validateGstinCriteria from "../../utils/validateGstinCriteria";
import LoadingState from "../../schema/LoadingState";
import LoadingOverlay from "../common/LoadingOverlay";
import authHandler from "../../actions/auth/authHandler";
import AuthActionType from "../../schema/AuthActionType";

interface SignUpFormProps {
    goToLoginPage: () => void;
}

interface SignUpFormStateProps {
    signUpState: LoadingState;
}

interface SignUpFormDispatchProps {
    signUpHandler: (
        name: string,
        phoneNumber: string,
        password: string,
        gstin: string
    ) => Promise<any>;
}

interface IInput {
    value: string;
    isValid: boolean;
}

function SignUpForm(
    props: SignUpFormProps & SignUpFormStateProps & SignUpFormDispatchProps
) {
    const [inputs, setInputs] = React.useState<{
        name: IInput;
        phoneNumber: IInput;
        password: IInput;
        confirmPassword: IInput;
        gstin: IInput;
    }>({
        name: { value: "", isValid: true },
        phoneNumber: { value: "", isValid: true },
        password: { value: "", isValid: true },
        confirmPassword: { value: "", isValid: true },
        gstin: { value: "", isValid: true },
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

    const onSignUp = () => {
        if (inputs.name.value.length === 0) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                name: { value: "", isValid: false },
            }));
            return;
        }

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

        if (inputs.password.value !== inputs.confirmPassword.value) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                confirmPassword: { value: "", isValid: false },
            }));
            return;
        }

        if (!validateGstinCriteria(inputs.gstin.value)) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                gstin: { value: "", isValid: false },
            }));
            return;
        }

        props
            .signUpHandler(
                inputs.name.value,
                inputs.phoneNumber.value,
                inputs.password.value,
                inputs.gstin.value
            )
            .then(({ payload }) => {
                setInputs((currentInputs) => ({
                    ...currentInputs,
                    [payload.validationPath]: { value: "", isValid: false },
                }));
            });
    };

    return (
        <>
            {props.signUpState === LoadingState.Pending ? (
                <LoadingOverlay message="Creating your account..." />
            ) : (
                <View style={styles.root}>
                    <Heading label="Sign Up" />
                    <Input
                        label="Name"
                        textInputConfig={{
                            onChangeText: inputChangeHandler.bind(null, "name"),
                            value: inputs.name.value,
                            placeholder: "Type your name",
                        }}
                        invalid={!inputs.name.isValid}
                    />
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
                            placeholder: "Create a password",
                            secureTextEntry: true,
                        }}
                        invalid={!inputs.password.isValid}
                    />
                    <Heading
                        label="It should have atleast 6 digits, 1 capital letter, 1 small letter, 1 number, 1 special character"
                        labelStyle={styles.promptLabelStyle}
                        containerStyle={styles.promptContainerStyle}
                        numberOfLines={2}
                    />
                    <Input
                        label="Confirm Password"
                        textInputConfig={{
                            onChangeText: inputChangeHandler.bind(
                                null,
                                "confirmPassword"
                            ),
                            value: inputs.confirmPassword.value,
                            placeholder: "confirm your password",
                            secureTextEntry: true,
                        }}
                        invalid={!inputs.confirmPassword.isValid}
                    />
                    <Input
                        label="GSTIN"
                        textInputConfig={{
                            onChangeText: inputChangeHandler.bind(
                                null,
                                "gstin"
                            ),
                            value: inputs.gstin.value,
                            placeholder: "Your GSTIN",
                        }}
                        invalid={!inputs.gstin.isValid}
                    />
                    <Heading
                        label="Please provide the authentic GSTIN as per terms and conditions"
                        labelStyle={styles.promptLabelStyle}
                        containerStyle={styles.promptContainerStyle}
                        numberOfLines={2}
                    />
                    <Button
                        onPress={onSignUp}
                        label="SignUp"
                        containerStyle={styles.buttonContainerStyle}
                        labelStyle={styles.buttonLabelStyle}
                        androidRippleColor="#505050"
                    />
                    <Button
                        onPress={props.goToLoginPage}
                        label="Use an existing account"
                        containerStyle={styles.loginButtonContainer}
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
    buttonLabelStyle: {
        color: "white",
    },
    promptLabelStyle: {
        color: "#c5c5c5",
        fontSize: 12,
    },
    loginButtonContainer: {
        borderRadius: 8,
        backgroundColor: "#D3D3D3",
    },
    promptContainerStyle: {
        marginVertical: 8,
        marginRight: 80,
    },
});

function mapState(state: RootState): SignUpFormStateProps {
    return {
        signUpState: state.user.authState,
    };
}

function mapDispatch(dispatch: Dispatch): SignUpFormDispatchProps {
    return {
        signUpHandler: (
            name: string,
            phoneNumber: string,
            password: string,
            gstin: string
        ): Promise<any> => {
            return dispatch(
                authHandler({
                    name,
                    phoneNumber,
                    password,
                    gstin,
                    actionType: AuthActionType.SignUp,
                })
            );
        },
    };
}

export default connect(mapState, mapDispatch)(SignUpForm);
