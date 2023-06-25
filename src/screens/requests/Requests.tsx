import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import React from "react";
import LoadingState from "../../schema/LoadingState";
import IUserRequests from "../../schema/user/IUserRequests";
import getUserTradeRequests from "../../actions/requests/getUserTradeRequests";
import RequestList from "../../components/requests/RequestList";

interface RequestStateProps {
    requestsLoadingState: LoadingState;
    requests: IUserRequests;
    token: string;
}

interface RequestDispatchProps {
    fetchUserTradeRequest: (token: string) => void;
}

function Request(props: RequestStateProps & RequestDispatchProps) {
    React.useEffect(() => {
        if (props.requestsLoadingState !== LoadingState.success) {
            props.fetchUserTradeRequest(props.token);
        }
    }, []);

    return (
        <>
            <View style={styles.root}>
                {props.requestsLoadingState === LoadingState.pending ? (
                    <LoadingOverlay message="Loading..." />
                ) : (
                    <RequestList requests={props.requests} />
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    addIconContainer: {
        margin: 0,
        backgroundColor: "black",
        height: 48,
        width: 48,
        borderRadius: 12,
    },
    buttonContainer: {
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});

function mapState(state: RootState): RequestStateProps {
    const user = state.user;
    return {
        token: user.token || "",
        requestsLoadingState: user.requestsState,
        requests: user.requests || { sent: [], received: [] },
    };
}

function mapDispatch(dispatch: Dispatch): RequestDispatchProps {
    return {
        fetchUserTradeRequest: (token: string) => {
            dispatch(getUserTradeRequests({ token }));
        },
    };
}

export default connect(mapState, mapDispatch)(Request);
