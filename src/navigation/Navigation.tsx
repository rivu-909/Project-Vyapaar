import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { connect } from "react-redux";
import startUp from "../actions/boot/startup";
import LoadingOverlay from "../components/common/LoadingOverlay";
import LoadingState from "../schema/LoadingState";
import { Dispatch, RootState } from "../store/store";
import AuthStack from "./AuthStack";
import UserHomeStack from "./UserHomeStack";

interface NavigationStateProps {
    // isNewUser: boolean;
    isAuthenticated: boolean;
    bootState: LoadingState;
}

interface NavigationDispatchProps {
    start: () => void;
}

function Navigation(props: NavigationStateProps & NavigationDispatchProps) {
    useEffect(() => {
        props.start();
    }, []);

    return (
        <>
            {props.bootState === LoadingState.pending ? (
                <LoadingOverlay
                    message="Loading..."
                    style={{ backgroundColor: "black" }}
                />
            ) : (
                <NavigationContainer>
                    {props.isAuthenticated ? <UserHomeStack /> : <AuthStack />}
                </NavigationContainer>
            )}
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

function mapDispatch(dispatch: Dispatch): NavigationDispatchProps {
    return {
        start: () => {
            startUp(dispatch);
        },
    };
}

export default connect(mapState, mapDispatch)(Navigation);
