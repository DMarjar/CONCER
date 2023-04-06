import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CandidateInformation from "../../modules/candidates/adapters/screens/CandidateInformation";
import CandidatesPENDIENTES from "../../modules/candidates/adapters/screens/CandidatesPENDIENTES";
import CandidatesENTREGADOS from "../../modules/candidates/adapters/screens/CandidatesENTREGADOS";
import CandidateInformationEntr from "../../modules/candidates/adapters/screens/CandidateInformationEntr";

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
      <Stack.Screen name="Candidatos" component={CandidatesPENDIENTES} />

      <Stack.Screen name="Candidatura" component={CandidateInformation} />

      <Stack.Screen name="Entregados" component={CandidatesENTREGADOS} />

      <Stack.Screen name="Entregado" component={CandidateInformationEntr} />
    </Stack.Navigator>
  );
}
