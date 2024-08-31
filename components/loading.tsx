import { useThemeColor } from "@/hooks/useThemeColor";
import { ActivityIndicator } from "react-native";

export default function Loading({ size = 32 }: { size?: number }) {
  const colorLoading = useThemeColor({}, "buttonActive");

  return <ActivityIndicator color={colorLoading} size={size} />;
}
