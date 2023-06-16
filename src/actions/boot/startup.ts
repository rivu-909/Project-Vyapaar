import LoadingState from "../../schema/LoadingState";
import { setBootState } from "../../store/reducer/user/userSlice";
import { Dispatch } from "../../store/store";
import retrieveUserData from "./retrieveUserData";
import retrieveUserToken from "./retrieveUserToken";
import * as SplashScreen from "expo-splash-screen";

export default async function startUp(dispatch: Dispatch) {
    await Promise.all([
        retrieveUserData(dispatch),
        retrieveUserToken(dispatch),
    ]);
    await SplashScreen.hideAsync();
    dispatch(setBootState(LoadingState.success));
}
