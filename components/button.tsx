import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import TextTheme from "./Text";

type Props = PressableProps & {
  titulo: string;
  loading?: boolean;
};

export default function Button({ titulo, disabled, ...outherProps }: Props) {
  const buttonActi = useThemeColor({}, "buttonActive");
  const buttonInac = useThemeColor({}, "buttonInactive");

  return (
    <Pressable
      style={[
        style.container,
        {
          backgroundColor: disabled ? buttonInac : buttonActi,
        },
      ]}
      {...outherProps}
    >
      <TextTheme
        style={{
          color: disabled
            ? useThemeColor({}, "text")
            : useThemeColor({}, "textInverted"),
        }}
        font="PoppinsBold"
      >
        {titulo}
      </TextTheme>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "80%",
    height: 65,

    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",
  },
});
