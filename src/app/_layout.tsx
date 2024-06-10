/**
 * index.tsx が画面全体を使うようにするおまじない
 */

import { Slot } from "expo-router";

const Layout = (): JSX.Element => {
  return <Slot />;
};

export default Layout;
