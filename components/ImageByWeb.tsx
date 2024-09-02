import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Loading from "./loading";
import Quadrado60x60 from "./Quadrado60x60";

type PropsImageByWeb = {
  url?: string;
};

export default React.memo<PropsImageByWeb>(({ url }) => {
  const [loading, setLoading] = useState(true);
  const [uri, setUri] = useState<string | undefined>();
  const color = useThemeColor({}, "text");

  useEffect(() => {
    if (url) {
      setLoading(true);
      Image.prefetch(url)
        .then(() => {
          setUri(url);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setUri(undefined);
      setLoading(false);
    }
  }, [url]);

  return (
    <View style={styles.container}>
      <Quadrado60x60>
        {!loading && typeof url == "string" ? (
          <Image
            src={uri}
            style={{
              height: 60,
              width: 60,
            }}
          />
        ) : loading ? (
          <Loading />
        ) : (
          <Ionicons name="eye-off-outline" size={32} color={color} />
        )}
      </Quadrado60x60>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",

    padding: 5,
  },
});
