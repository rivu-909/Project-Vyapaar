import { StyleSheet, Text, View } from "react-native";
import ITrade from "../../schema/products/ITrade";
import Heading from "../common/Heading";

interface TradeProps {
    trade: ITrade;
}

export default function Trade(props: TradeProps) {
    const { price, address, type } = props.trade;
    return (
        <View style={styles.root}>
            <Heading label={price} />
            <Text>{type}</Text>
            <Text>
                {address.district} | {address.state}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 8,
        flex: 1,
        margin: 4,
        backgroundColor: "white",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: "space-between",
    },
});
