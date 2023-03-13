import React, { useContext } from "react";
import Login from "../../modules/auth/adapters/screens/Login";
import Navigation from "../navigation/Navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../../kernel/context/AuthContext";


const Stack = createNativeStackNavigator();

export default function MainStack(){

    
    const {isAuth} = useContext(AuthContext)

    return (
            <Stack.Navigator 
                screenOptions={() => ({
                    headerShown:false,
                    title:""
                })}           
            >   
            {
                isAuth ? (
                    <Stack.Group>
                        <Stack.Screen name="Home" component={Navigation} />
                    </Stack.Group>            
                ) : (
                    <Stack.Group>
                        <Stack.Screen name="Login" component={Login} />
                    </Stack.Group>
                )
            }
            </Stack.Navigator>
    );
}
