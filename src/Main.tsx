import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import startUp from "./actions/boot/startup";
import Navigation from "./navigation/Navigation";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import fonts from "./fonts";

interface MainDispatchProps {
    start: () => void;
}

SplashScreen.preventAutoHideAsync();

function Main(props: MainDispatchProps) {
    const [loaded] = useFonts(fonts);
    React.useEffect(() => {
        props.start();
    }, []);

    if (!loaded) {
        return <View style={{ backgroundColor: "black", flex: 1 }} />;
    }

    return <Navigation />;
}

function mapDispatch(dispatch: Dispatch): MainDispatchProps {
    return {
        start: () => {
            startUp(dispatch);
        },
    };
}

export default connect(null, mapDispatch)(Main);
