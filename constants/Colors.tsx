export const Colors = {
  light: {
    text: "#11181C",
    textBlue: "#070CB6",
    textInverted: "#ECEDEE",
    buttonTextColor: "#ECEDEE",
    background: "#F9F9F9",
    inputBackground: "#ECEDEE",
    error: "#EA4335",
    editableNot: "#EBEEF2",
    placeHolder: "#807e7e",
    noteContainer: "#070CB61C",
    buttonActive: "#070CB6",
    buttonInactive: "#ECEDEE",
    tabBarBackground: "#161040",
    select: "#b67307",
    backGroundItemList: "#f2f6fc",

    entradaFundo: "#E4FFC1",
    entradaTexto: "#65A810",

    saidaFundo: "#FFC1C1",
    saidaTexto: "#A81010",
  },
  dark: {
    text: "#ECEDEE",
    textBlue: "#070CB6",
    textInverted: "#11181C",
    buttonTextColor: "#ECEDEE",
    background: "#11181C",
    inputBackground: "#1A1D1E",
    error: "#FF0000",
    editableNot: "#1A1D1E",
    placeHolder: "#807e7e",
    noteContainer: "#070CB61C",
    buttonActive: "#070CB6",
    buttonInactive: "#1A1D1E",
    tabBarBackground: "#161040",
    select: "#b67307",
    backGroundItemList: "#1A1D1E",

    entradaFundo: "#E4FFC1",
    entradaTexto: "#65A810",

    saidaFundo: "#FFC1C1",
    saidaTexto: "#A81010",
  },
};

export type ColorsType = keyof typeof Colors.light | keyof typeof Colors.dark;
