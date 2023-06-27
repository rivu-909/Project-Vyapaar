import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import startUp from "./actions/boot/startup";
import Navigation from "./navigation/Navigation";
import { useFonts } from "expo-font";
import fonts from "./fonts";
import StartUpLoading from "./components/common/StartUpLoading";

interface MainDispatchProps {
    start: () => void;
}

function Main(props: MainDispatchProps) {
    const [loaded] = useFonts(fonts);
    const [showLoader, setShowLoader] = React.useState(true);

    React.useEffect(() => {
        props.start();
        setTimeout(() => {
            setShowLoader(false);
        }, 2000);
    }, []);

    const renderNavigation = React.useCallback(() => {
        return <Navigation />;
    }, []);

    return (
        <>
            {(!loaded || showLoader) && <StartUpLoading />}
            {loaded && renderNavigation()}
        </>
    );
}

function mapDispatch(dispatch: Dispatch): MainDispatchProps {
    return {
        start: () => {
            startUp(dispatch);
        },
    };
}

export default connect(null, mapDispatch)(Main);
