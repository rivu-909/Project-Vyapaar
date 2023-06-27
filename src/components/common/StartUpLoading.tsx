import React from "react";
import { View } from "react-native";

export default function StartUpLoading() {
    const [width, setWidth] = React.useState(0);
    React.useEffect(() => {
        for (let i = 0; i < 2000; i += 20) {
            setTimeout(() => {
                setWidth((prevWidth) => prevWidth + 1);
            }, i);
        }
    }, []);
    return (
        <View
            style={{
                backgroundColor: "black",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            }}
        >
            <View
                style={{
                    height: 20,
                    borderWidth: 1,
                    borderColor: "white",
                    width: "50%",
                    marginHorizontal: 50,
                    borderRadius: 15,
                    justifyContent: "center",
                    padding: 5,
                }}
            >
                <View
                    style={{
                        backgroundColor: "white",
                        height: 10,
                        width: `${width}%`,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                />
            </View>
        </View>
    );
}
