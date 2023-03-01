import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Loading from "../../kernel/components/Loading";
import { Icon } from "@rneui/base";
import Login from "../../modules/auth/adapters/screens/Login";

const Tab = createBottomTabNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="login"
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color }) => screenOptions(route, color),
					tabBarActiveTintColor: "#228B22",
					tabBarInactiveTintColor: "gray",
				})}
            >
                <Tab.Screen
					name="login"
					component={Login}
					options={{ title: "Login" }}
				/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}


const screenOptions = (route, color) => {
	let iconName;
	switch (route.name) {
		case "login":
			iconName = "login";
			break;
	}
	return (
		<Icon
			type="material-community"
			name={iconName}
			size={22}
			color={color}
		/>
	);
};
