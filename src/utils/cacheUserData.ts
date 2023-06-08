import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDataKey } from "../constants";
import User from "../schema/user/User";

export default async function cacheUserData(user: User) {
    const storeValue = JSON.stringify({
        name: user.name,
        userId: user.userId,
        phoneNumber: user.phoneNumber,
    });
    await AsyncStorage.setItem(userDataKey, JSON.stringify(storeValue));
}
