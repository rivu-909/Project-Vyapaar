import { FlatList, StyleSheet, View } from "react-native";
import ITrade from "../../schema/products/ITrade";
import Trade from "./Trade";

interface TradeListProps {
    trades: Array<ITrade>;
}

function renderTrade({ item }: { item: ITrade }) {
    return <Trade trade={item} />;
}

export default function TradeList(props: TradeListProps) {
    return (
        <View style={styles.tradeList}>
            <FlatList
                data={props.trades}
                keyExtractor={(t) => t._id}
                renderItem={renderTrade}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    tradeList: {
        flex: 1,
        padding: 8,
    },
});
