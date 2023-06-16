import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import LoadingState from "../schema/LoadingState";
import { RootState } from "../store/store";
import AuthStack from "./AuthStack";
import UserHomeStack from "./UserHomeStack";

interface NavigationStateProps {
    // isNewUser: boolean;
    isAuthenticated: boolean;
    bootState: LoadingState;
}

function Navigation(props: NavigationStateProps) {
    return (
        <>
            <NavigationContainer>
                {props.isAuthenticated ? <UserHomeStack /> : <AuthStack />}
            </NavigationContainer>
        </>
    );
}

function mapState(state: RootState): NavigationStateProps {
    const user = state.user;
    return {
        // isNewUser: !!state.user.userId,
        isAuthenticated: !!user.token,
        bootState: user.bootState,
    };
}

export default connect(mapState)(Navigation);
