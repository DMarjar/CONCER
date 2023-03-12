import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View} from "react-native";
import { Input, Image,Icon } from "@rneui/base";
import { Button } from "react-native-elements";
import { isEmpty } from "lodash";
import Loading from "../../../../kernel/components/Loading";
import { Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../../../config/axios";
import axios from "../../../../kernel/gateway/http-auth.gateway";
import { AuthContext } from "../../../../kernel/context/AuthContext";

export default function Login(){
    const {isAuth,setAuth} = useContext(AuthContext)
    const[showPassword,setShowPassword] = useState(true);
    const [show, setShow] = useState(false)
    const payload = { user: '', password: ''}
    const [error, setError] = useState(payload)
    const [data, setData] = useState(payload)
    const changePayload = (e, type) => {
        setData({ ...data, [type]: e.nativeEvent.text })
    }

    const login = async () => {
        if (!(isEmpty(data.user) || isEmpty(data.password))){
            setShow(true);      
            
                try {
                    const account = await axios.doPost("/auth/inicioSesion", {
                        username: data.user,
                        password: data.password,
                    });
                    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${account.data.data.token}`;
                    if (account.data.data.user.authorities[0].authority === "GESTOR") {
                        setShow(false);
                        setAuth(true);
                    } else {
                        setShow(false);
                        Alert.alert(
                            "ACCESO DENEGADO",
                            "Lo sentimos, no se pudo iniciar sesión. Contacte con el administrador para saber mas sobre el uso de la aplicacion.",
                            [{ text: "Ok", style: "cancel" }],
                            { cancelable: true, onDismis: () => console.log() }
                        );
                        AsyncStorage.removeItem("token");
                    }
                } catch (error) {
                    setShow(false);
                }

        }else{
            setError({ user: 'Campo obligatorio', password: 'Campo obligatorio'})
        }
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

                <Loading setShow={show} text="Iniciando sesion" />
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
        marginHorizontal: 15,
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