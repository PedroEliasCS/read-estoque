import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 5,
    borderWidth: 2,
  },
  checked: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginLeft: 3,
  },
});

export interface CheckBoxProps {
  propsTouchable?: TouchableOpacityProps;
  styleText?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onpress?: () => unknown;
  checked?: boolean;
  text?: string;

  key?: string;
}

/**
 * Elemento de Check box com texto
 * @UsadoEm Login modal
 */
const CheckBox = ({
  propsTouchable,
  onpress,
  checked,
  styleText,
  text,
  key,
  style,
}: CheckBoxProps) => {
  const cinza = useThemeColor({}, "placeHolder");

  const [checkedInside, setChecked] = useState(checked || false);

  const styleInside = { ...styles };

  return (
    <View style={style}>
      <TouchableOpacity
        style={styles.container}
        {...propsTouchable}
        onPress={() => {
          setChecked(!checkedInside);
          if (onpress) onpress();
        }}
        activeOpacity={1}
      >
        <View
          style={[
            [
              styleInside.checkbox,
              {
                borderColor: cinza,
              },
            ],
            checkedInside && [
              styleInside.checked,
              {
                backgroundColor: cinza,
              },
            ],
          ]}
        />
        <Text style={[styles.label, styleText]}>{text || ""}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckBox;
