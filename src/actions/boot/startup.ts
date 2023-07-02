import LoadingState from "../../schema/LoadingState";
import { setBootState } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch } from "../../store/store";
import retrieveUserAddress from "./retrieveUserAddress";
import retrieveUserData from "./retrieveUserData";
import retrieveUserToken from "./retrieveUserToken";

export default async function startUp(dispatch: Dispatch) {
    await Promise.all([
        retrieveUserData(dispatch),
        retrieveUserToken(dispatch),
        retrieveUserAddress(dispatch),
    ]);
    dispatch(setBootState(LoadingState.Success));
}
