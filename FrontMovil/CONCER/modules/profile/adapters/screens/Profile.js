import React from "react";
import { View, Text, Button} from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
    const navigation = useNavigation();
 
    

    return(
        <View>
            <Text></Text>
            <Button
                title="cerrar sesion"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}