import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import TextTheme from "./Text";
import Loading from "./loading";

type Props = PressableProps & {
  titulo: string;
  loading?: boolean;
};

export default function Button({
  titulo,
  loading,
  disabled,
  onPress,
  ...outherProps
}: Props) {
  const buttonActi = useThemeColor({}, "buttonActive");
  const buttonInac = useThemeColor({}, "buttonInactive");

  const textColor = useThemeColor({}, "text");
  const textInvert = useThemeColor({}, "textInverted");

  return (
    <Pressable
      style={[
        style.container,
        {
          backgroundColor: disabled ? buttonInac : buttonActi,
        },
      ]}
      onPress={disabled || loading ? undefined : onPress}
      {...outherProps}
    >
      {!loading && (
        <TextTheme
          style={{
            color: disabled ? textColor : textInvert,
          }}
          font="PoppinsBold"
        >
          {titulo}
        </TextTheme>
      )}

      {loading && <Loading color={textColor} />}
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
