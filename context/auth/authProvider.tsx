import { NavigationContainerProps } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { GlobalContext } from "../global/Global";
import AuthContext from "./Auth";

export default function AuthProvider({ children }: NavigationContainerProps) {
  const { auth } = useContext(GlobalContext);

  const router = useRouter();

  if (!auth) {
    router.replace("/");
    return null;
  }

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
