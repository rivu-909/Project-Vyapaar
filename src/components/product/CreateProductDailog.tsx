import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../common/Button";
import DailogBox from "../common/DailogBox";
import Heading from "../common/Heading";
import Input from "../common/Input";

interface CreateProductDailogProps {
    visible: boolean;
    onClose: () => void;
}

export default function CreateProductDailog(props: CreateProductDailogProps) {
    const [inputs, setInputs] = React.useState<{
        name: string;
        price: string;
        description: string;
    }>({
        name: "",
        price: "",
        description: "",
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
                <Heading label="Create product" />
                <Input
                    label="Name"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(null, "name"),
                        value: inputs.name,
                        placeholder: "Jack Daniel",
                    }}
                />
                <Input
                    label="Price"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(null, "price"),
                        value: inputs.price,
                        placeholder: "2990 (Market price)",
                    }}
                />
                <Input
                    label="Description"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(
                            null,
                            "description"
                        ),
                        value: inputs.description,
                        placeholder: "Premium imported whiskey",
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
