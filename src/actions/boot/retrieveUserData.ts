import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "../../store/store";
import { userDataKey } from "../../constants";
import { setUser } from "../../store/reducer/user/userSlice";
import User from "../../schema/user/User";

export default async function retrieveUserData(dispatch: Dispatch) {
    const dataString = await AsyncStorage.getItem(userDataKey);
    if (!dataString) {
        return;
    }
    const userData = JSON.parse(dataString);
    dispatch(setUser(userData));
}
