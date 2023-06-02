import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { connect } from "react-redux";
import fetchToken from "../actions/auth/fetchToken";
import LoadingOverlay from "../components/common/LoadingOverlay";
import { Dispatch, RootState } from "../store/store";
import AuthStack from "./AuthStack";
import UserHomeStack from "./UserHomeStack";

interface NavigationStateProps {
    isAuthenticated: boolean;
    fetchingToken: boolean;
}

interface NavigationDispatchProps {
    fetchTokenHandler: () => void;
}

function Navigation(props: NavigationStateProps & NavigationDispatchProps) {
    useEffect(() => {
        props.fetchTokenHandler();
    }, []);

    return (
        <NavigationContainer>
            {props.fetchingToken ? (
                <LoadingOverlay message="Please wait..." />
            ) : props.isAuthenticated ? (
                <UserHomeStack />
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
}

function mapState(state: RootState): NavigationStateProps {
    const user = state.user;
    return {
        isAuthenticated: !!user.token,
        fetchingToken: user.fetchingToken,
    };
}

function mapDispatch(dispatch: Dispatch): NavigationDispatchProps {
    return {
        fetchTokenHandler: () => dispatch(fetchToken()),
    };
}

export default connect(mapState, mapDispatch)(Navigation);
