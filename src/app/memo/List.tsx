import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Link, router, useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import MemoListItem from "../../components/MemoListItem";
import CircleButton from "../../components/CircleButton";
import LogoutButton from "../../components/LogoutButton";
import Icon from "../../components/Icon";

const handlePress = (): void => {
  router.push("/memo/Create");
};

const List = (): JSX.Element => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogoutButton />;
      },
    });
  }, []);

  return (
    <View style={styles.container}>
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
