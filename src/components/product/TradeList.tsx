import { StyleSheet, View, ScrollView } from "react-native";
import ITrade from "../../schema/products/ITrade";
import TradeType from "../../schema/products/TradeType";
import Heading from "../common/Heading";
import TradeCard from "./TradeCard";

interface TradeListProps {
    trades: Array<ITrade>;
    productId: string;
}

export default function TradeList(props: TradeListProps) {
    const renderFlatList = (trades: Array<ITrade>, productId: string) => {
        return (
            <>
                {trades.map((trade) => (
                    <TradeCard
                        trade={trade}
                        productId={productId}
                        key={trade._id}
                    />
                ))}
            </>
        );
    };

    const renderHeading = (label: string) => {
        return (
            <Heading
                label={label}
                labelStyle={styles.headingStyle}
                containerStyle={styles.headingContainer}
            />
        );
    };

    const asksList = props.trades.filter((t) => t.type === TradeType.Ask);
    const bidsList = props.trades.filter((t) => t.type === TradeType.Bid);

    return (
        <ScrollView>
            <View style={styles.root}>
                {asksList.length !== 0 ? renderHeading("ASKS") : null}
                {renderFlatList(asksList, props.productId)}
                {bidsList.length !== 0 ? renderHeading("BIDS") : null}
                {renderFlatList(bidsList, props.productId)}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 8,
    },
    headingContainer: {
        alignItems: "center",
        marginBottom: 8,
    },
    headingStyle: {
        fontSize: 20,
    },
});
