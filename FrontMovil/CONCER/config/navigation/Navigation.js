import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Loading from "../../kernel/components/Loading";
import { Icon } from "@rneui/base";
import ProfileStack from "../stack/ProfileStack";
import HomeStack from "../stack/HomeStack";

const Tab = createBottomTabNavigator();

export default function Navigation(){
    return(
            <Tab.Navigator

				screenOptions={({ route }) => ({
					tabBarIcon: ({ color }) => screenOptions(route, color),
					tabBarActiveTintColor: "#009574",
					tabBarInactiveTintColor: "gray",
					headerShown:false
				})}
            >

				<Tab.Screen
					name="candidates"
					component={HomeStack}
					options={{ title: "Candidates" }}
				/>
                <Tab.Screen
					name="profile"
					component={ProfileStack}
					options={{ title: "Profile" }}
				/>
				
            </Tab.Navigator>
    );
}


const screenOptions = (route, color) => {
	let iconName;
	switch (route.name) {
		case "profile":
			iconName = "account";
			break;
		case "candidates":
			iconName = "animation";
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
