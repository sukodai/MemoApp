import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Link, router } from "expo-router";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/Icon";

const handlePress = (): void => {
  router.back();
};

const Edit = (): JSX.Element => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput value={"買い物\nリスト"} style={styles.input} multiline />
      </View>
      <CircleButton onPress={handlePress}>
        <Icon name="check" size={40} color="#FFF" />
      </CircleButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Edit;
