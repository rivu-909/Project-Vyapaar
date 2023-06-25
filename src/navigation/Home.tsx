import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllProducts from "../screens/products/AllProducts";
import News from "../screens/news/News";
import Requests from "../screens/requests/Requests";

const Tab = createMaterialTopTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
            }}
            sceneContainerStyle={{ backgroundColor: "white" }}
        >
            <Tab.Screen name="All" component={AllProducts} />
            <Tab.Screen name="News" component={News} />
            <Tab.Screen name="Requests" component={Requests} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarLabelStyle: {
        fontFamily: "MerriweatherRegular",
        fontSize: 16,
    },
});
