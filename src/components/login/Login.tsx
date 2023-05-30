import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import LoadingOverlay from "../common/LoadingOverlay";
import LoginForm from "./LoginForm";

interface LoginStateProps {
    isLoggedIn: boolean;
    isLoggingIn: boolean;
}

function Login(props: LoginStateProps) {
    return (
        <>
            {props.isLoggingIn ? (
                <LoadingOverlay message="Logging you in..." />
            ) : (
                <LoginForm />
            )}
        </>
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
