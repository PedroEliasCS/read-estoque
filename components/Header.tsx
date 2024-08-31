import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

type HeaderProps = NativeStackHeaderProps & {};

export default function Header({ navigation }: HeaderProps) {
  const color = useThemeColor({}, "text");

  return (
    <ThemedView style={[styles.container]}>
      <Pressable onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={34} color={color} />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    width: 50,
    height: 50,
    backgroundColor: "transparent",
  },
});
