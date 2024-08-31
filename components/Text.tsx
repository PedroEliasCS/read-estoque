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
  colorThemeDark?: string;
  colorThemeLight?: string;
};

export default function TextTheme({
  font = Fonts.PoppinsMedium,
  colorThemeDark,
  colorThemeLight,
  style,
  ...outherProps
}: Props) {
  const colorText = useThemeColor(
    {
      dark: colorThemeDark,
      light: colorThemeLight,
    },
    "text"
  );

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
