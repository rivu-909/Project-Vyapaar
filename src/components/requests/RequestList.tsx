import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import IUserRequests from "../../schema/user/IUserRequests";
import Heading from "../common/Heading";
import ConnectionDailog from "../dailogs/ConnectionDailog";
import RequestCard from "./RequestCard";

interface RequestListProps {
    requests: IUserRequests;
}

export default function RequestList(props: RequestListProps) {
    const renderHeading = (label: string) => {
        return (
            <Heading
                label={label}
                labelStyle={styles.headingStyle}
                containerStyle={styles.headingContainer}
            />
        );
    };

    return (
        <>
            <ScrollView>
                <View style={styles.root}>
                    {props.requests.received.length !== 0
                        ? renderHeading("RECEIVED")
                        : null}
                    {props.requests.received.map((r) => (
                        <RequestCard request={r} key={r._id} received={true} />
                    ))}
                    {props.requests.sent.length !== 0
                        ? renderHeading("SENT")
                        : null}
                    {props.requests.sent.map((r) => (
                        <RequestCard request={r} key={r._id} received={false} />
                    ))}
                </View>
            </ScrollView>
            <ConnectionDailog />
        </>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 8,
    },
    headingContainer: {
        alignItems: "center",
        marginBottom: 8,
    },
    headingStyle: {
        fontSize: 20,
    },
});
