import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import SignUp from "./src/components/signUp/SignUp";
import Login from "./src/components/login/Login";
import Welcome from "./src/screens/welcome/Welcome";
import store from "./src/store/store";

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Login />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
