import { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import Button from "../button";
import InputText from "../InputText";
import TextTheme from "../Text";
import { ThemedView } from "../ThemedView";
import styleModule from "./module.style";

type PropsModalInputText = {
  autoCompletes?: string[];
  close: () => void;
  complete: (c: string) => void;
};

/**
 *  @returns
 */
export default function ModalInputText({
  autoCompletes,
  close,
  complete,
}: PropsModalInputText) {
  const [value, onChangeText] = useState("");

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
          <TextTheme>Digite o código do produto:</TextTheme>
          <InputText
            titulo="Código"
            value={value}
            onChangeText={onChangeText}
            autoCompletes={autoCompletes}
          />

          <Button titulo="Checar" onPress={() => complete(value)} />
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  ...styleModule,
});
