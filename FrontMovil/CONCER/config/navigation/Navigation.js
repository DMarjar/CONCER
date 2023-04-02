import React from "react";
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
					headerShown:false,
					title:""
					
				})}
            >

				<Tab.Screen
					name="Candidaturas"
					component={HomeStack}
					options={{ title: "Candidatos" }}
				/>
                <Tab.Screen
					name="Perfil"
					component={ProfileStack}
					options={{ title: "Perfil" }}
				/>
				
            </Tab.Navigator>
    );
}


const screenOptions = (route, color) => {
	let iconName;
	switch (route.name) {
		case "Perfil":
			iconName = "account";
			break;
		case "Candidaturas":
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
