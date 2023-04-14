import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Candidates from "../../modules/candidates/adapters/screens/Candidates";
import CandidateInformation from "../../modules/candidates/adapters/screens/CandidateInformation";
import CandidatesEntr from "../../modules/candidates/adapters/screens/CandidatesEntr";
import CandidateInformationEntr from "../../modules/candidates/adapters/screens/CandidateInformationEntr";

const Stack = createNativeStackNavigator();

export default function HomeStack({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "while",
        headerStyle: { backgroundColor: "#009574" },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Candidaturas" component={Candidates} />

      <Stack.Screen name="Candidatura" component={CandidateInformation} />

      <Stack.Screen name="Entregadas" component={CandidatesEntr} />

      <Stack.Screen name="Informacion" component={CandidateInformationEntr} />
    </Stack.Navigator>
  );
}
