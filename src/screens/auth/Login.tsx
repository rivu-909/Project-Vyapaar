import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import LoginForm from "../../components/login/LoginForm";

interface LoginStateProps {
    isLoggedIn: boolean;
    isLoggingIn: boolean;
}

interface LoginNavigationProps {
    navigation: any;
}

function Login(props: LoginStateProps & LoginNavigationProps) {
    const goToSignUpPage = () => {
        props.navigation.navigate("SignUp");
    };
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            {props.isLoggingIn ? (
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
        isLoggedIn: user.isLoggedIn,
        isLoggingIn: user.isLoggingIn,
    };
}

export default connect(mapState)(Login);
