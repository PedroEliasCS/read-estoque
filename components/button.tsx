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
  style,
  ...outherProps
}: Props) {
  const buttonActi = useThemeColor({}, "buttonActive");
  const buttonInac = useThemeColor({}, "buttonInactive");
  const textColor = useThemeColor({}, "textInverted");
  const textInvert = useThemeColor({}, "text");

  return (
    <Pressable
      style={[
        styleLocal.container,
        {
          backgroundColor: disabled ? buttonInac : buttonActi,
        },
        ,
        style as any,
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

const styleLocal = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "80%",
    height: 65,

    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",
  },
});
