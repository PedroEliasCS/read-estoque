import { useThemeColor } from "@/hooks/useThemeColor";
import { ActivityIndicator } from "react-native";

export default function Loading({
  size = 32,
  color,
}: {
  size?: number;
  color?: string;
}) {
  const colorLoading = color || useThemeColor({}, "buttonActive");

  return <ActivityIndicator color={colorLoading} size={size} />;
}
