import AsyncStorage from "@react-native-async-storage/async-storage";
import { userAddressKey } from "../constants";
import Address from "../schema/Address";

export default async function cacheUserAddress(address: Address) {
    const value = JSON.stringify(address);
    await AsyncStorage.setItem(userAddressKey, value);
}
