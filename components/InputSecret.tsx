import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { StyleSheet, TextInputProps, View } from "react-native";
import CheckBox, { CheckBoxProps } from "./CheckBox";
import InputText from "./InputText";

interface InputSecretProps {
  textInputProps?: TextInputProps;
  checkBoxProps?: CheckBoxProps;
  checkbox?: boolean;
}

const inputSecretStyle = StyleSheet.create({
  inputSecret: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 80,
  },

  checkBox: {
    position: "absolute",
    right: 10,
    bottom: "40%",
  },
});

/**
 * Elemento de Input com texto secreto
 * @param props
 */
const InputSecret = (
  props: InputSecretProps & { titulo: string; error?: boolean; nota?: string }
) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const cinza = useThemeColor({}, "placeHolder");

  return (
    <View style={inputSecretStyle.inputSecret}>
      <InputText
        {...props.textInputProps}
        secureTextEntry={secureTextEntry}
        titulo={props.titulo}
        error={props.error}
        nota={props.nota}
      />

      {(props.checkbox === undefined || props.checkbox) && (
        <CheckBox
          style={[
            inputSecretStyle.checkBox,
            {
              borderColor: cinza,
            },
          ]}
          styleText={{
            color: cinza,
            fontSize: 11,
          }}
          onpress={() => {
            setSecureTextEntry(!secureTextEntry);
          }}
          {...props.checkBoxProps}
        />
      )}
    </View>
  );
};

export default InputSecret;
