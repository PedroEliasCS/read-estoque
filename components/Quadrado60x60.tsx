import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";

type PropsQuadrado60x60 = PressableProps & {
  style?: ViewStyle;
};

export default function Quadrado60x60({
  children,
  style,
  ...props
}: PropsQuadrado60x60) {
  const colorBack = useThemeColor({}, "editableNot");

  return (
    <Pressable
      style={[
        styles.quadrado,
        {
          backgroundColor: colorBack,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  quadrado: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
