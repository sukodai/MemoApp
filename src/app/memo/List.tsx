import { StyleSheet, View } from "react-native";
import { Link, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Header from "../../components/Header";
import MemoListItem from "../../components/MemoListItem";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/Icon";

const handlePress = (): void => {
  router.push("/memo/Create");
};

const List = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Header />
      <MemoListItem />
      <MemoListItem />
      <MemoListItem />
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
