import { Modal, StyleSheet, View } from "react-native";

interface DailogBoxProps {
    visible: boolean;
    children: JSX.Element;
    onClose: () => void;
}

export default function DailogBox(props: DailogBoxProps) {
    return (
        <Modal
            visible={props.visible}
            animationType="fade"
            onRequestClose={props.onClose}
            transparent={true}
        >
            <View style={styles.dailogBox}>{props.children}</View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    dailogBox: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 40,
    },
});
