import React from "react";
import Login from "../../modules/auth/adapters/screens/Login";
import Navigation from "../navigation/Navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createNativeStackNavigator();

export default function MainStack(){

    return (
        <NavigationContainer >
            <Stack.Navigator 
                screenOptions={({ route }) => ({
                    headerShown:false
                })}           
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Navigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}