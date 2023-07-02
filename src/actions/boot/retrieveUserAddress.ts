import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "../../store/store";
import { userAddressKey } from "../../constants";
import { setUserAddress } from "../../store/reducer/user/userSlice";

export default async function retrieveUserAddress(dispatch: Dispatch) {
    const dataString = await AsyncStorage.getItem(userAddressKey);
    if (!dataString) {
        return;
    }
    const address = JSON.parse(dataString);
    dispatch(setUserAddress(address));
}
