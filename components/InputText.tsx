import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import TextTheme from "./Text";
const style = StyleSheet.create({
  container: {
    height: 80,
    width: "100%",
    padding: 3,

    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    height: 45,
    width: "100%",
    borderRadius: 5,
    textAlign: "left",
    paddingLeft: 10,

    paddingBottom: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    justifyContent: "center",
    fontFamily: "Poppins",
    textAlignVertical: "bottom",
  },

  tituloContainer: {
    width: "100%",
    justifyContent: "flex-start",
    height: 20,
  },
  titulo: {
    fontSize: 15,
    textAlign: "left",
    lineHeight: 20,
  },
  notaContainer: {
    width: "100%",
    height: 23,
    bottom: 3,
    left: 3,
    justifyContent: "flex-start",

    zIndex: -1,
  },
  notaBalao: {
    width: "50%",
    height: 27,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },

  nota: {
    top: 7,
    fontSize: 12,
    textAlign: "center",
  },
});

/**
 * Faz um TextInput com as configurações padrões
 * @param props Props do TextInput
 * @returns O elemento
 */
export default function InputText(
  props: TextInputProps & {
    titulo: string;
    error?: boolean;
    nota?: string;
    autoCompletes?: string[];
  }
) {
  return (
    <View style={style.container}>
      <View style={style.tituloContainer}>
        <TextTheme style={[style.titulo]}>{props.titulo}</TextTheme>
      </View>
      <TextInput
        {...{
          ...{ ...props, titulo: undefined },
          style: [
            [
              style.textInput,
              {
                color: useThemeColor({}, "text"),
                backgroundColor: useThemeColor({}, "inputBackground"),
              },
              props.error && {
                borderColor: useThemeColor({}, "error"),
                borderWidth: 1,
              },
              // editable pode ser undefined, então não podemos usar !!props.editable
              props.editable === false && {
                backgroundColor: useThemeColor({}, "editableNot"),
              },
            ],
            props.style,
          ],
        }}
        placeholderTextColor={useThemeColor({}, "placeHolder")}
        textAlignVertical="center"
        accessibilityLabel={`Input de texto de ${props.titulo}`}
      />
      <View style={[style.notaContainer]}>
        {props.nota && (
          <View
            style={[
              style.notaBalao,
              {
                backgroundColor: useThemeColor({}, "noteContainer"),
              },
              !!props?.nota &&
                props.nota.length > 20 && {
                  width: "80%",
                },
            ]}
          >
            <TextTheme
              style={[
                style.nota,
                {
                  color: useThemeColor({}, "textBlue"),
                },
                props.error && {
                  color: useThemeColor({}, "error"),
                },
              ]}
              font="PoppinsBold"
            >
              {props.nota}
            </TextTheme>
          </View>
        )}
      </View>
    </View>
  );
}
