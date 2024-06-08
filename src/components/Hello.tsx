import { StyleSheet, type TextStyle, Text, View } from "react-native";

interface Props {
  children: string;
  bang?: boolean;
  style?: TextStyle;
}

const Hello = (props: Props): JSX.Element => {
  return (
    <View>
      <Text style={[styles.text, props.style]}>
        Hello {props.children} {props.bang === true ? "!" : "?"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    backgroundColor: "blue",
    fontSize: 40,
    fontWeight: "bold",
    padding: 16,
  },
});

export default Hello;
