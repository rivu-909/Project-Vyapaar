import { ActivityIndicator } from "react-native";
import Heading from "./Heading";

interface LoadingOverlayProps {
    message: string;
}

export default function (props: LoadingOverlayProps) {
    return (
        <>
            <Heading label={props.message} />
            <ActivityIndicator size="large" />
        </>
    );
}
