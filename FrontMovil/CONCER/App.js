import React from "react";
import MainStack from "./config/stack/MainStack";
<<<<<<< Updated upstream

=======
import { AuthProvider } from "./kernel/context/AuthContext";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);
>>>>>>> Stashed changes

export default function App(){
  return (
    <MainStack/>
  );
}