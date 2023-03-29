import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Candidates from "../../modules/candidates/adapters/screens/Candidates";
import CandidateInformation from "../../modules/candidates/adapters/screens/CandidateInformation";

const Stack = createNativeStackNavigator();

export default function HomeStack({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "while",
        headerStyle: { backgroundColor: "#009574" },
      }}
    >
      <Stack.Screen name="Candidatos" component={Candidates} />

      <Stack.Screen name="Candidatura" component={CandidateInformation} />
    </Stack.Navigator>
  );
}
