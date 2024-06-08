import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Hello from "./src/components/Hello";

const App = (): JSX.Element => {
  console.log("App is launching...");

  return (
    <View style={styles.container}>
      <Hello style={{ color: "red" }}>World</Hello>
      <Hello>World</Hello>
      <Text>Open up App.tsx to start working on your app!!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
