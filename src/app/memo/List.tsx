import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Link, router, useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import MemoListItem from "../../components/MemoListItem";
import CircleButton from "../../components/CircleButton";
import LogoutButton from "../../components/LogoutButton";
import Icon from "../../components/Icon";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, db } from "../../config";
import { type Memo } from "../../../types/memo";

const handlePress = (): void => {
  router.push("/memo/Create");
};

const List = (): JSX.Element => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogoutButton />;
      },
    });
  }, []);

  useEffect(() => {
    // メモデータの監視
    //if (auth.currentUser.uid === null) return;
    const ref = collection(db, `users/${auth.currentUser?.uid}/memos`);
    const q = query(ref, orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      const remoteMemos: Memo[] = [];
      snapshot.forEach((doc: any) => {
        const { bodyText, updatedAt } = doc.data();
        console.log("docId:", doc.id, bodyText, updatedAt);
        remoteMemos.push({
          id: doc.id,
          bodyText: bodyText,
          updatedAt: updatedAt,
        });
      });
      setMemos(remoteMemos);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={({ item }) => <MemoListItem memo={item} />}
      />
      <CircleButton onPress={handlePress}>
        <Icon name="plus" size={40} color="#FFF" />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default List;
