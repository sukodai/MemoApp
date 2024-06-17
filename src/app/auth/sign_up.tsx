import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import Button from "../../components/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";

const handrePress = (email: string, password: string): void => {
  // 会員登録
  console.log(email, password);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentical) => {
      console.log(userCredentical.user.uid);
      //router.push("/memo/List"); // 画面遷移の履歴が積み上がるため
      router.replace("/memo/List");
    })
    .catch((err: any) => {
      console.log(err.code, err.message);
      Alert.alert(err.message);
    });
};

const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="Password"
          textContentType="password"
        />
        <Button
          label="Submit"
          onPress={() => {
            handrePress(email, password);
          }}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
          <Link href="/auth/log_in" asChild={true} replace={true}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Log In!</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "#FFF",
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: "#000000",
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: "#467FD3",
    marginRight: 8,
  },
});

export default SignUp;
