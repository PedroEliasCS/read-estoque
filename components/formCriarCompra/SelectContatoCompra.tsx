import { IContato } from "@/clients/types/api.types";
import { GlobalContext } from "@/context/global/Global";
import { useThemeColor } from "@/hooks/useThemeColor";
import useVar from "@/hooks/useVar";
import { SearchBar } from "@rneui/base";
import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Loading from "../loading";
import TextTheme from "../Text";

export default ({
  value,
  setValue,
}: {
  value: IContato | null;
  setValue: (value: IContato) => void;
}) => {
  const backGroundItemList = useThemeColor({}, "backGroundItemList");

  const select = useThemeColor({}, "select");

  const {
    apis: { principal: Api },
  } = useContext(GlobalContext);

  const [contatos, , setContatos, loadingContatos] = useVar<IContato[]>({
    initial: [],
  });

  const [search, setSearch] = useState("");

  const Selected = ({ selecionado }: { selecionado: IContato }) => {
    return (
      <View style={style.containerSelected}>
        <View
          style={[
            style.containerSelectPressable,
            {
              backgroundColor: select,
              padding: 5,
            },
          ]}
        >
          {
            <TextTheme
              font="PoppinsBold"
              style={{
                fontSize: 20,
                marginBottom: 3,
              }}
            >
              Contato selecionado
            </TextTheme>
          }
          <TextTheme>{selecionado.nome}</TextTheme>
          <TextTheme>Bling id: {selecionado.bling_id}</TextTheme>
        </View>
      </View>
    );
  };

  const Select = ({ contato }: { contato: IContato }) => {
    return (
      <View style={style.containerSelect} key={contato.id}>
        <Pressable
          onPress={() => {
            setValue(contato);
            setContatos([]);
          }}
          style={[
            style.containerSelectPressable,
            {
              backgroundColor: backGroundItemList,
            },
          ]}
        >
          <TextTheme>{contato.nome}</TextTheme>
          <TextTheme>Bling id: {contato.bling_id}</TextTheme>
        </Pressable>
      </View>
    );
  };

  const [loading, setLoading] = useState(false);

  const actionSearch = async () => {
    setLoading(true);

    await Api.getContatos(1, search).then((data) =>
      setContatos(
        data.filter(
          (contato, index, self) =>
            index === self.findIndex((c) => c.id === contato.id)
        )
      )
    );

    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length >= 3) {
        actionSearch();
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <View>
      <SearchBar
        placeholder="Selecione um contato"
        value={search}
        onChangeText={(e) => setSearch(e)}
        onSubmitEditing={actionSearch}
      />
      {value && <Selected selecionado={value} />}

      {loading && <Loading />}

      {!loading &&
        !loadingContatos &&
        contatos.map((contato) => <Select contato={contato} />)}
    </View>
  );
};

const style = StyleSheet.create({
  containerSelecao: {
    width: "100%",
    height: "auto",
  },

  containerSelected: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",

    padding: 10,
  },

  containerSelect: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",

    padding: 10,
  },

  containerSelectPressable: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 5,

    padding: 5,
    borderRadius: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    minHeight: 50,
  },
});
