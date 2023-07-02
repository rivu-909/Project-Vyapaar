import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import LoadingState from "../schema/LoadingState";
import { RootState } from "../store/store";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

interface NavigationStateProps {
    isAuthenticated: boolean;
}

function Navigation(props: NavigationStateProps) {
    return (
        <>
            <NavigationContainer>
                {props.isAuthenticated ? <MainStack /> : <AuthStack />}
            </NavigationContainer>
        </>
    );
}

function mapState(state: RootState): NavigationStateProps {
    return {
        isAuthenticated: !!state.user.token,
    };
}

export default connect(mapState)(Navigation);
