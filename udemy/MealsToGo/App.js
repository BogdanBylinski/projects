import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { initializeApp } from "firebase/app";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APPKEY,
  authDomain: "mealstogo-9b7c9.firebaseapp.com",
  projectId: "mealstogo-9b7c9",
  storageBucket: "mealstogo-9b7c9.appspot.com",
  messagingSenderId: "565601649286",
  appId: "1:565601649286:web:f4c9c35935c3b8784bc707",
};

const app = initializeApp(firebaseConfig);
export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
