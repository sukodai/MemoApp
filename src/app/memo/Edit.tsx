import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/Icon";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../config";
import { type Memo } from "../../../types/memo";

const handlePress = (id: string, bodyText: string): void => {
  if (auth.currentUser === null) return;
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
  setDoc(ref, {
    bodyText: bodyText,
    updatedAt: Timestamp.fromDate(new Date()),
  })
    .then(() => {
      router.back();
    })
    .catch((err: any) => {
      console.log(err);
      Alert.alert("更新に失敗しました");
    });
};

const Edit = (): JSX.Element => {
  //const params = useLocalSearchParams(); params の全部を見る
  const id = String(useLocalSearchParams().id); // idだけ出す
  const [bodyText, setBodyText] = useState("");
  console.log("Edit params.id:", id);

  useEffect(() => {
    if (auth.currentUser === null) return;
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
    getDoc(ref)
      .then((docRef: any) => {
        console.log("Edit docRef", docRef.data());
        const remoteBodyText = docRef.data().bodyText;
        setBodyText(remoteBodyText);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          style={styles.input}
          multiline
          autoFocus={true}
          onChangeText={(text) => {
            setBodyText(text);
          }}
        />
      </View>
      <CircleButton onPress={() => handlePress(id, bodyText)}>
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
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
});

export default Edit;
