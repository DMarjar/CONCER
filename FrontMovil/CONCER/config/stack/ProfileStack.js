import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../modules/profile/adapters/screens/Profile";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "while",
        headerStyle: { backgroundColor: "#009574" },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Perfil" component={Profile} />
    </Stack.Navigator>
  );
}
