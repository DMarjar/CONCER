import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { AuthContext } from "../../../../kernel/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Profile() {
    const [account, setAccount] = useState({});
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        const getAccountData = async () => {
        try {
            const accountData = await AsyncStorage.getItem("account");
            const parsedAccount = JSON.parse(accountData);
            setAccount(parsedAccount);
        } catch (error) {
            console.log("Error al obtener los datos de la cuenta: ", error);
        }
    };
        getAccountData();
    }, []);

    const cerrarSesion = async () => {
        try {
            AsyncStorage.removeItem("token");
            AsyncStorage.removeItem("account")
            setAuth(false);
        } catch (error) {
            console.log("Error al cerrar sesión: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileInfo}>
                <Image
                    source={require("../../../../assets/favicon.png")}
                    style={styles.profileImage}
                    resizeMode="cover"
                />
                <View style={styles.profileText}>
                    <Text style={styles.nameText}>
                    {account.firstName} {account.lastName}
                    </Text>
                    <Text style={styles.emailText}>{account.email}</Text>
                    <Text style={styles.phoneText}>{account.phoneNumber}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Cerrar sesión" onPress={cerrarSesion} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    profileInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileText: {
        marginLeft: 20,
    },
    nameText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    emailText: {
        fontSize: 16,
        color: "#888",
        marginBottom: 5,
    },
    phoneText: {
        fontSize: 16,
        color: "#888",
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 20,
    },
});
