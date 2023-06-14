import LoadingState from "../../schema/LoadingState";
import { setBootState } from "../../store/reducer/user/userSlice";
import { Dispatch } from "../../store/store";
import retrieveUserData from "./retrieveUserData";
import retrieveUserToken from "./retrieveUserToken";
import setFonts from "./setFonts";

export default async function startUp(dispatch: Dispatch) {
    // dispatch(setBootState(LoadingState.pending));
    await Promise.all([
        setFonts(),
        retrieveUserData(dispatch),
        retrieveUserToken(dispatch),
    ]);
    dispatch(setBootState(LoadingState.success));
}
