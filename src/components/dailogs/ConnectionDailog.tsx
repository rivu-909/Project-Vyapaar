import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { onCloseConnectionDailog } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import DailogBox from "../common/DailogBox";
import Heading from "../common/Heading";

interface ConnectiontDailogStateProps {
    visible: boolean;
    userName: string;
    phoneNumber: string;
}

interface ConnectiontDailogDispatchProps {
    onExit: () => void;
}

function ConnectiontDailog(
    props: ConnectiontDailogStateProps & ConnectiontDailogDispatchProps
) {
    return (
        <DailogBox onClose={props.onExit} visible={props.visible}>
            <View style={styles.centeredView}>
                <Heading
                    label="Connection details"
                    labelStyle={styles.descriptionLabel}
                    containerStyle={styles.headingContainer}
                />
                <Heading
                    label={`Name: ${props.userName}`}
                    labelStyle={styles.headingLabel}
                    containerStyle={styles.headingContainer}
                />
                <Heading
                    label={`Contact: ${props.phoneNumber}`}
                    labelStyle={styles.headingLabel}
                    containerStyle={styles.headingContainer}
                />
                <View style={styles.buttonsContainer}>
                    <Button
                        label="Okay"
                        onPress={props.onExit}
                        containerStyle={styles.buttonContainerStyle}
                        labelStyle={styles.buttonText}
                        androidRippleColor="#505050"
                    />
                </View>
            </View>
        </DailogBox>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
    },
    descriptionLabel: {
        fontSize: 28,
    },
    headingContainer: {
        marginVertical: 4,
    },
    headingLabel: {
        fontSize: 20,
    },
    buttonsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginRight: 20,
    },
    buttonContainerStyle: {
        marginTop: 8,
        flex: 1,
        borderRadius: 8,
        backgroundColor: "black",
    },
    buttonText: {
        color: "white",
    },
});

function mapState(state: RootState): ConnectiontDailogStateProps {
    const connectionDailog = state.appConfig.connectionDailog;
    return {
        visible: connectionDailog.visible,
        userName: connectionDailog.userName ?? "",
        phoneNumber: connectionDailog.phoneNumber ?? "",
    };
}

function mapDispatch(dispatch: Dispatch): ConnectiontDailogDispatchProps {
    return {
        onExit: () => {
            dispatch(onCloseConnectionDailog());
        },
    };
}

export default connect(mapState, mapDispatch)(ConnectiontDailog);
