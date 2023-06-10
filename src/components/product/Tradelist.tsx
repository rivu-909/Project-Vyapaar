import { FlatList, StyleSheet, View } from "react-native";
import ITrade from "../../schema/products/ITrade";
import TradeType from "../../schema/products/TradeType";
import Trade from "./Trade";

interface TradeListProps {
    trades: Array<ITrade>;
    productId: string;
}

export default function TradeList(props: TradeListProps) {
    const renderTrade = ({ item }: { item: ITrade }) => {
        return <Trade trade={item} productId={props.productId} />;
    };

    const renderFlatList = (trades: Array<ITrade>, productId: string) => {
        return (
            <FlatList
                data={trades}
                keyExtractor={(t) => t._id}
                renderItem={renderTrade}
                extraData={productId}
            />
        );
    };

    return (
        <View style={styles.tradeList}>
            {renderFlatList(
                props.trades.filter((t) => t.type === TradeType.Ask),
                props.productId
            )}
            {renderFlatList(
                props.trades.filter((t) => t.type === TradeType.Bid),
                props.productId
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    tradeList: {
        flex: 1,
        padding: 8,
    },
});
