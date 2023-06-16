import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { onCloseRequestConfirmDailog } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import DailogBox from "../common/DailogBox";
import Heading from "../common/Heading";

interface ConfirmRequestDailogStateProps {
    visible: boolean;
    userId: string;
    productId: string;
    tradeId: string;
}

interface ConfirmRequestDailogDispatchProps {
    onCancelRequest: () => void;
}

function ConfirmRequestDailog(
    props: ConfirmRequestDailogStateProps & ConfirmRequestDailogDispatchProps
) {
    const onConfirm = React.useCallback(() => {
        console.log({
            userId: props.userId,
            productId: props.productId,
            tradeId: props.tradeId,
        });
        props.onCancelRequest();
    }, [props.productId, props.productId, props.tradeId]);

    return (
        <DailogBox onClose={props.onCancelRequest} visible={props.visible}>
            <View style={styles.centeredView}>
                <Heading
                    label="Request the user?"
                    labelStyle={styles.headingLabel}
                />
                <View style={styles.buttonsContainer}>
                    <Button
                        label="Confirm"
                        onPress={onConfirm}
                        containerStyle={{
                            ...styles.buttonContainerStyle,
                            ...styles.buttonContainerDark,
                        }}
                        labelStyle={styles.buttonText}
                    />
                    <Button
                        label="Cancel"
                        onPress={props.onCancelRequest}
                        containerStyle={styles.buttonContainerStyle}
                    />
                </View>
            </View>
        </DailogBox>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
    },
    headingLabel: {
        fontSize: 28,
    },
    buttonsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginRight: 20,
    },
    buttonContainerStyle: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: "#D3D3D3",
    },
    buttonContainerDark: {
        backgroundColor: "black",
    },
    buttonText: {
        color: "white",
    },
});

function mapState(state: RootState): ConfirmRequestDailogStateProps {
    const reqConfirmDailogState = state.appConfig.requestConfiirmDailog;
    return {
        visible: reqConfirmDailogState.visible,
        userId: reqConfirmDailogState.userId ?? "",
        productId: reqConfirmDailogState.productId ?? "",
        tradeId: reqConfirmDailogState.tradeId ?? "",
    };
}

function mapDispatch(dispatch: Dispatch): ConfirmRequestDailogDispatchProps {
    return {
        onCancelRequest: () => {
            dispatch(onCloseRequestConfirmDailog());
        },
    };
}

export default connect(mapState, mapDispatch)(ConfirmRequestDailog);
