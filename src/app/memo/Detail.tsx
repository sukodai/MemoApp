import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/Icon";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../../config";
import { type Memo } from "../../../types/memo";

const handlePress = (id: string): void => {
  router.push({ pathname: "/memo/Edit", params: { id: id } });
  //router.push("/memo/Edit");
};

const Detail = () => {
  const [memo, setMemo] = useState<Memo | null>(null);
  const params = useLocalSearchParams();
  console.log("params:", params);

  useEffect(() => {
    if (auth.currentUser === null) return;
    const ref = doc(
      db,
      `users/${auth.currentUser.uid}/memos`,
      String(params.id)
    );
    const unsubscribe = onSnapshot(ref, (memoDoc) => {
      console.log("memoDoc", memoDoc.data());
      const { bodyText, updatedAt } = memoDoc.data() as Memo;
      setMemo({
        id: memoDoc.id,
        bodyText: bodyText,
        updatedAt: updatedAt,
      });
    });
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>
          {memo?.bodyText}
        </Text>
        <Text style={styles.memoDate}>
          {memo?.updatedAt?.toDate().toLocaleString("ja-JP")}
        </Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>{memo?.bodyText}</Text>
      </ScrollView>
      <CircleButton
        style={{ top: 60, bottom: "auto" }}
        onPress={() => {
          handlePress(String(params.id));
        }}
      >
        {/* <Feather name="plus" size={40} /> */}
        <Icon name="pencil" size={40} color="#FFF" />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  memoHeader: {
    backgroundColor: "#467FD3",
    height: 96,
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "bold",
  },
  memoDate: { color: "#fff", fontSize: 12, lineHeight: 16, fontWeight: "bold" },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoBodyText: {
    color: "#000",
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Detail;
