import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import LoginForm from "../../components/login/LoginForm";
import { LoginScreenNavigationProp } from "../../schema/ReactNavigation";
import LoadingState from "../../schema/LoadingState";

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
        <View style={styles.root}>
            {props.loginState === LoadingState.pending ? (
                <LoadingOverlay message="Logging you in..." />
            ) : (
                <>
                    <LoginForm />
                    <Text onPress={goToSignUpPage}>
                        Don't have an account yet?
                    </Text>
                </>
            )}
        </View>
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
        alignItems: "center",
        justifyContent: "center",
    },
});

export default connect(mapState)(Login);
