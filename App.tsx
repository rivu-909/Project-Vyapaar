import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import Main from "./src/Main";
import store from "./src/store/store";

export default function App() {
    return (
        <>
            <StatusBar style="light" backgroundColor="black" />
            <Provider store={store}>
                <Main />
            </Provider>
        </>
    );
}
