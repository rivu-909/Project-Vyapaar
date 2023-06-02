import { Provider } from "react-redux";
import Navigation from "./navigation/Navigation";
import store from "./store/store";

export default function Main() {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
}
