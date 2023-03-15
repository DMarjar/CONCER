import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import MainStack from "./config/stack/MainStack";
import { AuthProvider } from "./kernel/context/AuthContext";

export default function App(){
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainStack/>
      </NavigationContainer>
    </AuthProvider>
    
  );
}
