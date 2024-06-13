/**
 * index.tsx が画面全体を使うようにするおまじない
 */

import { Slot, Stack } from "expo-router";

const Layout = (): JSX.Element => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#467FD3",
        },
        headerTintColor: "#FFF",
        headerTitle: "MemoApp",
        headerBackTitle: "Back",
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: "bold",
        },
      }}
    />
  );
};

export default Layout;
