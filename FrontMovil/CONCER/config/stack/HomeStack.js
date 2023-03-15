import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Candidates from "../../modules/candidates/adapters/screens/Candidates";

const Stack = createNativeStackNavigator();

export default function HomeStack({route}){
    return(
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'while',
                headerStyle: {backgroundColor: '#009574'}
            }}
        >
            <Stack.Screen
                name="Candidates"
                component={Candidates}
            />
        </Stack.Navigator>
    );
}