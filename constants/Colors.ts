export const Colors = {
  light: {
    text: "#11181C",
    textBlue: "#070CB6",
    textInverted: "#ECEDEE",
    background: "#F9F9F9",
    inputBackground: "#ECEDEE",
    error: "#EA4335",
    editableNot: "#EBEEF2",
    placeHolder: "#807e7e",
    noteContainer: "#070CB61C",
    buttonActive: "#070CB6",
    buttonInactive: "#ECEDEE",
  },
  dark: {
    text: "#ECEDEE",
    textBlue: "#070CB6",
    textInverted: "#11181C",
    background: "#11181C",
    inputBackground: "#1A1D1E",
    error: "#FF0000",
    editableNot: "#1A1D1E",
    placeHolder: "#807e7e",
    noteContainer: "#070CB61C",
    buttonActive: "#070CB6",
    buttonInactive: "#1A1D1E",
  },
};

export type ColorsType = keyof typeof Colors.light | keyof typeof Colors.dark;
