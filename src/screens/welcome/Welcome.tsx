import React from "react";
import { GestureResponderEvent, Text, View } from "react-native";
import Button from "../../components/common/Button";

export default function Welcome() {
    const clickHandler = (evt: GestureResponderEvent) => {
        evt.stopPropagation();
        console.log("Button clicked!");
    };
    return (
        <View>
            <Text>Welcome to Vyapaar</Text>
            <Button onPress={clickHandler} label="click me!" />
        </View>
    );
}
