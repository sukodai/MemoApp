import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Link, router } from "expo-router";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/Icon";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../config";

const handlePress = async (bodyText: string): Promise<void> => {
  if (auth.currentUser === null) return;
  const ref = collection(db, `users/${auth.currentUser.uid}/memos`);

  await addDoc(ref, {
    bodyText: bodyText,
    updatedAt: Timestamp.fromDate(new Date()),
  })
    .then((docRef: any) => {
      console.log("Success", docRef.id);
      router.back();
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

const Create = (): JSX.Element => {
  const [bodyText, setBodyText] = useState("");

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          style={styles.input}
          multiline
          autoFocus
          onChangeText={(text) => {
            setBodyText(text);
          }}
        />
      </View>
      <CircleButton onPress={() => handlePress(bodyText)}>
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

export default Create;
