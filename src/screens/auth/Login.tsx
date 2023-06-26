import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import LoginForm from "../../components/login/LoginForm";
import { LoginScreenNavigationProp } from "../../schema/ReactNavigation";

interface LoginProps {
    navigation: LoginScreenNavigationProp;
}

export default function Login(props: LoginProps) {
    const goToSignUpPage = () => {
        props.navigation.navigate("SignUp");
    };

    return (
        <ScrollView
            style={styles.root}
            contentContainerStyle={styles.contentStyle}
        >
            <LoginForm goToSignUpPage={goToSignUpPage} />
        </ScrollView>
    );
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
    },
});
