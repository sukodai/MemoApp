import { useEffect } from "react";
import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config";
import * as Application from "expo-application";
import Constants from "expo-constants";

const Index = () => {
  const expoClient = Constants.manifest2?.extra?.expoClient;
  console.log("applicationId:", Application.applicationId);
  console.log("applicationName:", Application.applicationName);
  console.log("usr-facing ver:", Application.nativeApplicationVersion);
  console.log("dev-facing ver:", Application.nativeBuildVersion);
  console.log("expoRuntime ver:", Constants.expoRuntimeVersion);
  console.log("expo ver:", Constants.expoVersion);
  console.log("bundleId:", expoClient?.ios?.bundleIdentifier);
  console.log("package", expoClient?.android?.package);
  console.log("buildNumber:", expoClient?.ios?.buildNumber); // udefined due to expo-server-management
  console.log("versionCode:", expoClient?.android?.versionCode); // udefined due to expo-server-management

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        router.replace("/memo/List");
      }
    });
  }, []);
  return <Redirect href="auth/log_in" />;
};

export default Index;
