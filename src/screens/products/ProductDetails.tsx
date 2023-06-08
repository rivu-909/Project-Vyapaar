import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/common/Button";
import Heading from "../../components/common/Heading";
import CreateTradeDailog from "../../components/product/CreateTradeDailog";
import { DetailsScreenRouteProp } from "../../schema/ReactNavigation";

interface ProductDetailsProps {
    route: DetailsScreenRouteProp;
}

export default function ProductDetails(props: ProductDetailsProps) {
    const [createTradeDailogVisibility, setCreateTradeDailogVisibility] =
        React.useState<boolean>(false);

    const bidClickHandler = React.useCallback(() => {
        setCreateTradeDailogVisibility(true);
    }, []);

    const onCloseTradeDailog = React.useCallback(() => {
        setCreateTradeDailogVisibility(false);
    }, []);

    const product = props.route.params.product;
    return (
        <View style={styles.screen}>
            <Heading label={product.name} />
            <Text>{product.description}</Text>
            <Text>{product.price}</Text>
            <Button label="BID" onPress={bidClickHandler} />
            <CreateTradeDailog
                onClose={onCloseTradeDailog}
                visible={createTradeDailogVisibility}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
    },
});
