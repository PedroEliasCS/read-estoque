import { Image, StyleSheet, View } from "react-native";
import TextTheme from "./Text";

export default function LogoStars() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/adaptive-icon.png")}
        style={styles.logo}
      />
      <TextTheme font="Baloo" style={styles.text}>
        Stars Encoding
      </TextTheme>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

    width: "100%",
    height: 130,
  },

  text: {
    fontSize: 20,
    textAlign: "center",
    lineHeight: 22.04,
  },

  logo: {
    height: 80,
    width: 80,
  },
});
