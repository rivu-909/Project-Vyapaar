import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../common/Button";
import DailogBox from "../common/DailogBox";
import Heading from "../common/Heading";
import Input from "../common/Input";

interface CreateTradeDailogProps {
    visible: boolean;
    onClose: () => void;
}

export default function CreateTradeDailog(props: CreateTradeDailogProps) {
    const [inputs, setInputs] = React.useState<{
        price: string;
        quantity: string;
        firstLine: string;
        secondLine: string;
        district: string;
        state: string;
        pincode: string;
    }>({
        price: "",
        quantity: "",
        firstLine: "",
        secondLine: "",
        district: "",
        state: "",
        pincode: "",
    });

    const inputChangeHandler = (
        inputIdentifier: string,
        enteredValue: string
    ) => {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: enteredValue,
            };
        });
    };

    const onSubmit = () => {
        console.log(inputs);
    };

    return (
        <DailogBox onClose={props.onClose} visible={props.visible}>
            <View style={styles.centeredView}>
                <Heading label="Create your bid" />
                <Input
                    label="Price"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(null, "price"),
                        value: inputs.price,
                        placeholder: "150000",
                    }}
                />
                <Input
                    label="Quantity"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(null, "quantity"),
                        value: inputs.quantity,
                        placeholder: "100 L",
                    }}
                />
                <Input
                    label="Address first line"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(null, "quantity"),
                        value: inputs.quantity,
                        placeholder: "Shop 5, Sobha Market...",
                    }}
                />
                <Input
                    label="Address Second Line"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(null, "quantity"),
                        value: inputs.quantity,
                        placeholder: "Near Eco Park...",
                    }}
                />
                <Input
                    label="District"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(null, "district"),
                        value: inputs.district,
                        placeholder: "Chandigarh",
                    }}
                />
                <Input
                    label="State"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(null, "state"),
                        value: inputs.state,
                        placeholder: "Punjab",
                    }}
                />
                <Input
                    label="Pincode"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(null, "pincode"),
                        value: inputs.pincode,
                        placeholder: "160014",
                    }}
                />
                <Button onPress={onSubmit} label="Submit" />
                <Button onPress={props.onClose} label="Cancel" />
            </View>
        </DailogBox>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
