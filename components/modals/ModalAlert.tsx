import { Modal, Pressable, StyleSheet, View } from "react-native";

import styleModule from "./module.style";
import { ThemedView } from "../ThemedView";
import TextTheme from "../Text";
import Button from "../button";
type PropsModalAlert = {
  text: string;
  close: () => void;
};

/**
 * Make a modal with a alert message
 * @param text - The message to show
 * @param close - The function to close the modal
 */
export default function ModalAlert({ text, close }: PropsModalAlert) {
  return (
    <Modal
      visible={true}
      transparent
      animationType="none"
      onRequestClose={close}
    >
      <View style={styles.container}>
        <Pressable style={styles.containerBackGround} onPress={close} />

        <ThemedView style={styles.containerModal}>
          <TextTheme font="PoppinsBold">Alerta</TextTheme>
          <TextTheme>{text}</TextTheme>
          <Button titulo="Ok" onPress={close} />
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  ...styleModule,
});
