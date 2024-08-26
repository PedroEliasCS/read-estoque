import { useThemeColor } from "@/hooks/useThemeColor";
import { Text } from "react-native";

enum Fonts {
  Poppins = "Poppins",
  PoppinsBold = "PoppinsBold",
  PoppinsExtraLight = "PoppinsExtraLight",
  PoppinsItalic = "PoppinsItalic",
  PoppinsLight = "PoppinsLight",
  PoppinsMedium = "PoppinsMedium",
  PoppinsSemiBold = "PoppinsSemiBold",
  Baloo = "Baloo",
}

type Props = Text["props"] & {
  font?: keyof typeof Fonts;
};

export default function TextTheme({
  font = Fonts.PoppinsMedium,
  style,
  ...outherProps
}: Props) {
  const colorText = useThemeColor({}, "text");

  return (
    <Text
      style={[
        {
          color: colorText,
          fontFamily: font,
        },
        style,
      ]}
      {...outherProps}
    />
  );
}
