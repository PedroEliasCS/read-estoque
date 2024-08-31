import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, StyleSheet } from "react-native";
import IconSelect, { IconNames } from "../icons/Icon";
import TextTheme from "../Text";

type PropsItemTabBar = {
  icone: IconNames;
  text: string;
  select: boolean;
  onPress: () => void;
};

export default function ItemTabBar({
  icone,
  text,
  select,
  onPress,
}: PropsItemTabBar) {
  const colorSelect = useThemeColor({}, "select");
  const colorInverted = useThemeColor(
    {
      dark: "#bfb5a4",
    },
    "textInverted"
  );
  const color = select ? colorSelect : colorInverted;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <IconSelect type={icone} width={22} height={22} color={color} />
      <TextTheme colorThemeDark={color} colorThemeLight={color}>
        {text}
      </TextTheme>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    padding: 5,
    paddingBottom: 2,
  },
});
