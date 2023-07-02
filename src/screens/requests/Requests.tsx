import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import React from "react";
import LoadingState from "../../schema/LoadingState";
import IUserRequests from "../../schema/user/IUserRequests";
import getReqNConnections from "../../actions/requests/getReqNConnections";
import RequestList from "../../components/requests/RequestList";
import { subscribe } from "../../store/ably";
import ITradeRequest from "../../schema/user/ITradeRequest";
import {
    addRequest,
    editRequestResponse,
} from "../../store/reducer/user/userSlice";

interface RequestStateProps {
    requestsLoadingState: LoadingState;
    requests: IUserRequests;
    token: string;
}

interface RequestDispatchProps {
    fetchUserTradeRequest: (token: string) => void;
    addTradeRequest: (request: ITradeRequest) => void;
    editResponse: (Request: ITradeRequest) => void;
}

function Request(props: RequestStateProps & RequestDispatchProps) {
    React.useEffect(() => {
        if (props.requestsLoadingState !== LoadingState.Success) {
            props.fetchUserTradeRequest(props.token);
        }
        subscribe(props.token, "send_request", (signal) =>
            props.addTradeRequest(signal.data)
        );
        subscribe(props.token, "request_response", (signal) => {
            props.editResponse(signal.data);
        });
    }, []);

    return (
        <>
            <View style={styles.root}>
                {props.requestsLoadingState === LoadingState.Pending ? (
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
        requestsLoadingState: user.reqNConnectionsState,
        requests: user.requests || { sent: [], received: [] },
    };
}

function mapDispatch(dispatch: Dispatch): RequestDispatchProps {
    return {
        fetchUserTradeRequest: (token: string) => {
            dispatch(getReqNConnections({ token }));
        },
        addTradeRequest: (request: ITradeRequest) => {
            dispatch(addRequest(request));
        },
        editResponse: (request: ITradeRequest) => {
            dispatch(editRequestResponse(request));
        },
    };
}

export default connect(mapState, mapDispatch)(Request);
