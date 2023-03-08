import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Input, Image,Icon } from "@rneui/base";
import { Button } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from "lodash";
import Loading from "../../../../kernel/components/Loading";


import axios from "../../../../kernel/gateway/auth/http-auth.gateway";

export default function Login(){

    const navigation = useNavigation();
    const[showPassword,setShowPassword] = useState(true);
    const [show, setShow] = useState(false)


    const payload = { user: '', password: ''}
    const [error, setError] = useState(payload)
    const [data, setData] = useState(payload)
    const changePayload = (e, type) => {
        setData({ ...data, [type]: e.nativeEvent.text })
    }

    const login = () => {
        if (!(isEmpty(data.user) || isEmpty(data.password))){

            setShow(true);

            (async () =>{
                try{
                    
                    const response = await axios.doPost(
                        "/auth/inicioSesion",
                        {
                            username: data.user,
                            password: data.password
                        }
                    );
                    console.log("servidor", response);
					setShow(false);
                }catch(e){
                    setShow(false);
                    console.log("no pude carnalito", e)
                }
            })();

            /*async function log() {
                try {
                    const response = await axios.post('http://localhost:8080/controlCertificaciones/auth/inicioSesion', {
                        username: "LOGIN",
                        password: "123456"
                    });
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            }

            log();*/


        }else{
            setError({ user: 'Campo obligatorio', password: 'Campo obligatorio'})
        }

        console.log("data", data)
    }
    
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
                    containerStyle={styles.input}
                    rightIcon={
                        <Icon type="material-comunity" name="account-circle" size={22} />
                    }
                    autoCapitalize="none"
                    onChange={(e)=> changePayload(e,"user")}
                    errorMessage={error.user}
                    
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
                    onChange={(e)=>changePayload(e,"password")}
                    errorMessage={error.password}
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
                    onPress={login}
                />


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        margin:20,
        marginTop:50,
    },
    logo:{
        width:"100%",
        height: 210,
        marginHorizontal: 20,
        marginVertical:'25%'
    },
    input:{
        width: "100%",
		marginVertical: 5,
    },
    btn:{
        backgroundColor: '#019979ff',
        borderRadius: 10,
        marginTop:30,
    }


});