import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Link } from "expo-router";
import Icon from "./Icon";
import { type Memo } from "../../types/memo";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../config";

interface Props {
  memo: Memo;
}

const handrePress = (id: string): void => {
  if (auth.currentUser === null) return;
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
  Alert.alert("メモを削除します", "よろしいですか？", [
    { text: "キャンセル" },
    {
      text: "削除する",
      style: "destructive",
      onPress: () => {
        deleteDoc(ref).catch((err) => {
          Alert.alert("削除に失敗しました");
        });
      },
    },
  ]);
};

const MemoListItem = (props: Props): JSX.Element | null => {
  const { memo } = props;
  const { bodyText, updatedAt } = memo;
  if (bodyText === null || updatedAt === null) return null;

  const dateString = updatedAt.toDate().toLocaleString("ja-JP");
  return (
    <Link
      href={{ pathname: "memo/Detail", params: { id: memo.id } }}
      asChild={true}
    >
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text numberOfLines={1} style={styles.memoListItemTitle}>
            {bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>{dateString}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handrePress(memo.id);
          }}
        >
          <Icon name="delete" size={32} color="#B0B0B0" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0, 0.15)",
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484",
  },
});

export default MemoListItem;
