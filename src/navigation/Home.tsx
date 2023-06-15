import { Text, View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllProducts from "../screens/products/AllProducts";

const Tab = createMaterialTopTabNavigator();

function Favourites() {
    return (
        <View>
            <Text>Favourites products goes here</Text>
        </View>
    );
}

export default function Home() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
            }}
            sceneContainerStyle={{ backgroundColor: "white" }}
        >
            <Tab.Screen name="All" component={AllProducts} />
            <Tab.Screen name="Favourites" component={Favourites} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarLabelStyle: {
        fontFamily: "Merriweather",
        fontSize: 16,
    },
});
