import React, {useContext} from "react";
import { View, Text, Button} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../../../kernel/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
    const {setAuth} = useContext(AuthContext)

    const cerrarSesion = async () => {
        try {
            AsyncStorage.removeItem("token");
            setAuth(false);
        } catch (error) {
            console.log("Error al cerrar sesión: ", error);
        }
    };

    return(
        <View>
            <Text></Text>
            <Button
                title="cerrar sesion"
                onPress={cerrarSesion}
            />
        </View>
    );
}