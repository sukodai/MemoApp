import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/Icon";

const handlePress = (): void => {
  router.push("/memo/Edit");
};

const Detail = () => {
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>買い物リスト</Text>
        <Text style={styles.memoDate}>2023年1月1日 10:00</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>あいうえお。かきくけこ</Text>
      </ScrollView>
      <CircleButton style={{ top: 60, bottom: "auto" }} onPress={handlePress}>
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
