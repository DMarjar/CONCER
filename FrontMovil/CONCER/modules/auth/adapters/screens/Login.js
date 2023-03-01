import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Input, Image,Icon } from "@rneui/base";
import { Button } from "react-native-elements";


export default function Login(){

    const[showPassword,setShowPassword] = useState(true);

    return(
        <View style={styles.container}>
            <ScrollView>
                <Image
                    source={require("../../../../assets/logo.png")}
                    resizeMode="contain"
                    style={styles.logo}
                />

                
                <Input
                    placeholder="Usuario"
                    keyboardType="email-address"
                    containerStyle={styles.input}
                    rightIcon={
                        <Icon type="material-comunity" name="email" size={22} />
                    }
                    autoCapitalize="none"
                    secureTextEntry={showPassword}
                    
                />

                <Input
                    placeholder="Contraseña"
                    containerStyle={styles.input}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name={showPassword ? "eye-off" : "eye"}
                            color=""
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                    secureTextEntry={showPassword}
                />

                <Button
                    title="Iniciar Sesion"
                    containerStyle = {styles.btn}
                    Icon={
						<Icon
							type="material-community"
							name="Login"
							size={22}
							color="#007bff"
						/>
					}
                />


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        margin:20,


    },
    logo:{
        width:"100%",
        height: 210,
        marginHorizontal: 20,
    },
    input:{
        width: "100%",
		marginVertical: 5,
    },
    btn:{
        backgroundColor: '#019979ff',
        borderRadius: 10,
    }


});