import * as Font from "expo-font";

const setFonts = async () => {
    try {
        await Font.loadAsync({
            MerriweatherRegular: require("../../../assets/fonts/Merriweather-Regular.ttf"),
            MerriweatherLightItalic: require("../../../assets/fonts/Merriweather-LightItalic.ttf"),
            MerriweatherLight: require("../../../assets/fonts/Merriweather-Light.ttf"),
        });
        console.log("font loaded");
    } catch (err) {
        console.log(err);
    }
};

export default setFonts;
