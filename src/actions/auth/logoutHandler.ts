import AsyncStorage from "@react-native-async-storage/async-storage";
import { userTokenKey } from "../../constants";
import { logout } from "../../store/reducer/user/userSlice";
import { Dispatch } from "../../store/store";

export default function logoutHandler(dispatch: Dispatch) {
    dispatch(logout());
    AsyncStorage.removeItem(userTokenKey);
}
