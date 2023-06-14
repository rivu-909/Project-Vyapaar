import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import LoginForm from "../../components/login/LoginForm";
import { LoginScreenNavigationProp } from "../../schema/ReactNavigation";
import LoadingState from "../../schema/LoadingState";
import Button from "../../components/common/Button";

interface LoginProps {
    navigation: LoginScreenNavigationProp;
}

interface LoginStateProps {
    loginState: LoadingState;
}

function Login(props: LoginProps & LoginStateProps) {
    const goToSignUpPage = () => {
        props.navigation.navigate("SignUp");
    };

    return (
        <ScrollView
            style={styles.root}
            contentContainerStyle={styles.contentStyle}
        >
            {props.loginState === LoadingState.pending ? (
                <LoadingOverlay message="Logging you in..." />
            ) : (
                <>
                    <LoginForm />
                    <Button
                        onPress={goToSignUpPage}
                        label="Create an account"
                        containerStyle={styles.buttonContainerStyle}
                    />
                </>
            )}
        </ScrollView>
    );
}

function mapState(state: RootState): LoginStateProps {
    const user = state.user;
    return {
        loginState: user.loginState,
    };
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    contentStyle: {
        flexGrow: 1,
        marginLeft: 20,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    buttonContainerStyle: {
        marginLeft: 12,
        borderRadius: 8,
        backgroundColor: "#D3D3D3",
    },
});

export default connect(mapState)(Login);
