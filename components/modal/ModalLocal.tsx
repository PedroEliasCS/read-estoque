import * as Clipboard from "expo-clipboard";
import { useContext, useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

import { ModalContext } from "@/context/modal/Modal";
import { useThemeColor } from "@/hooks/useThemeColor";
import IconSelect from "../icons/Icon";
import styles from "./ModalLocal.style";

const mostalTexts = {
  br: {
    copiadoComSucesso: "Copiado com sucesso",
  },
};

const texts = mostalTexts.br;

export function ModalLocal() {
  const { close, aberto, numberAbertos } = useContext(ModalContext);

  const contrasteCinza = useThemeColor({}, "editableNot");
  const text = useThemeColor({}, "text");
  const branco = useThemeColor({}, "background");
  const preto = useThemeColor({}, "text");

  numberAbertos.num++;

  const fecharPelofundo = () => {
    close();
    if (aberto?.afterClose) aberto?.afterClose();
  };

  const ElementCopiar = () => {
    const [copiado, setCopiado] = useState(false);

    const copiar = async () => {
      await Clipboard.setStringAsync(aberto?.textoCopiar?.textoCopiado || "");
      setCopiado(true);
    };

    return (
      <View
        style={[
          styles.containerTextoCopiar,
          {
            backgroundColor: contrasteCinza,
          },
        ]}
      >
        <TouchableOpacity onPress={copiar} style={styles.textoIcone}>
          <Text
            style={[
              styles.textCopiar,
              {
                color: text,
              },
            ]}
          >
            {copiado ? texts.copiadoComSucesso : aberto?.textoCopiar?.texto}
          </Text>
          {/* <IconSelect type={copiado ? "copiarCheio" : "copiarVazio"} /> */}
          {/* Implementar no futuro */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType={numberAbertos.num > 1 ? "none" : "slide"}
        transparent={true}
        visible={aberto !== null}
        onRequestClose={close}
      >
        <Pressable
          style={styles.tocavelFechar}
          onPress={() => fecharPelofundo()}
        />
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: branco,
                shadowColor: preto,
              },
            ]}
          >
            {aberto?.iconName && (
              <IconSelect type={aberto.iconName} width={35} height={35} />
            )}
            <Text
              style={[
                styles.text,
                {
                  color: preto,
                },
              ]}
            >
              {aberto?.texto}
            </Text>
            {aberto?.textoCopiar && <ElementCopiar />}
          </View>
        </View>
      </Modal>
    </View>
  );
}
