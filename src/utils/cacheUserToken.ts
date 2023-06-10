import AsyncStorage from "@react-native-async-storage/async-storage";
import { userTokenKey } from "../constants";

const expirationDuration = 12; /* hour */

export default async function cacheUserToken(token: string) {
    const tokenExpirationTime =
        Date.now() + expirationDuration * 60 * 60 * 1000;
    const value = JSON.stringify({
        token,
        tokenExpirationTime: tokenExpirationTime.toString(),
    });
    await AsyncStorage.setItem(userTokenKey, value);
}
