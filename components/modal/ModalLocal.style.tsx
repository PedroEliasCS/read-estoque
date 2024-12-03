import { StyleSheet } from "react-native";

const styleModalLocal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    position: "absolute",

    width: "100%",
    height: "100%",
  },

  tocavelFechar: {
    position: "absolute",

    width: "100%",
    height: "100%",

    zIndex: 1,
  },

  modalContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,

    position: "absolute",

    bottom: 5,
  },

  modalView: {
    width: "80%",
    borderRadius: 20,
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    bottom: 20,

    zIndex: 5,
    position: "absolute",
  },

  text: {
    textAlign: "center",
    fontSize: 17,

    paddingTop: 10,
  },

  containerTextoCopiar: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 5,

    marginTop: 10,
  },

  textoIcone: {
    width: "100%",
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  textCopiar: {
    textAlign: "center",
    fontSize: 14,
    paddingRight: 5,
  },
});

export default styleModalLocal;
