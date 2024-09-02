import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "../button";
import Loading from "../loading";
import ModalInputText from "../modals/ModalInputText";
import TextTheme from "../Text";
import { ThemedView } from "../ThemedView";

type ScanQrCodeProps = {
  onScan: (data: string) => void;
  close: () => void;
};

export default function ScanQrCode({ onScan, close }: ScanQrCodeProps) {
  const window = useRef(Dimensions.get("window")).current;
  const [permission, requestPermission] = useCameraPermissions();
  const [modalText, setModalText] = useState(false);

  if (!permission)
    return (
      <ThemedView>
        <Loading />
      </ThemedView>
    );

  if (!permission.granted)
    return (
      <ThemedView>
        <TextTheme>Permissão de câmera negada</TextTheme>
        <Button titulo="Solicitar permissão" onPress={requestPermission} />
      </ThemedView>
    );

  if (modalText)
    return (
      <ModalInputText close={() => setModalText(false)} complete={onScan} />
    );

  return (
    <ThemedView style={{ padding: 0 }}>
      <View style={styles.container}>
        <CameraView
          mute={true}
          style={[styles.camera]}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={(data) => {
            onScan(data.data);
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalText(true)}
            >
              <TextTheme colorThemeLight="#fff" font="PoppinsBold">
                Digite o código
              </TextTheme>
              <TextTheme
                colorThemeLight="#fff"
                font="PoppinsBold"
                style={{
                  fontSize: 20,
                  textDecorationLine: "underline",
                }}
              >
                Toque aqui
              </TextTheme>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.quadrado,
              {
                top: 0,
                width: "105%",
                height: "101%",
                zIndex: -1,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            children={<Ionicons name="scan" size={200} />}
          />
        </CameraView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    height: "100%",
    width: "100%",
    alignItems: "center",

    borderWidth: 1,
  },

  camera: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    zIndex: 5,
  },

  quadrado: {
    borderColor: "#fff",
    borderWidth: 2,
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: -1,
  },
});
