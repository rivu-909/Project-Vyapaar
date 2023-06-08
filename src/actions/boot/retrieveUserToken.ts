import AsyncStorage from "@react-native-async-storage/async-storage";
import { userTokenKey } from "../../constants";
import { setToken } from "../../store/reducer/user/userSlice";
import { Dispatch } from "../../store/store";

export default async function retrieveUserToken(dispatch: Dispatch) {
    const dataString = await AsyncStorage.getItem(userTokenKey);
    if (!dataString) {
        return;
    }
    const tokenData = JSON.parse(dataString);
    if (Date.now() > Number(tokenData.tokenExpirationTime)) {
        return;
    }
    const userToken = tokenData.token;
    dispatch(setToken(userToken));
}
