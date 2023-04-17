import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../../../../kernel/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";
import axios from "../../../../kernel/gateway/http-auth.gateway";

export default function Profile() {
  const [account, setAccount] = useState({});
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const getAccountData = async () => {
      try {
        const accountData = await AsyncStorage.getItem("account");
        const parsedAccount = JSON.parse(accountData);

        const response = await axios.Get("/person/one/" + parsedAccount.id);
        console.log(response.data.data);
        setAccount(response.data.data);
      } catch (error) {
        Alert.alert("Error", "Error al obtener los datos de la cuenta");
      }
    };
    getAccountData();
  }, []);

  const cerrarSesion = async () => {
    try {
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("account");
      setAuth(false);
    } catch (error) {
      console.log("Error al cerrar sesión: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: `data:image/png;base64,${account.pictureBase64}` }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.profileText}>
          <Text style={styles.nameText}>
            {account.firstName} {account.lastName}
          </Text>
          <Text style={styles.emailText}>{account.email}</Text>
          <Text style={styles.phoneText}>{account.phoneNumber}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Cerrar sesión"
          onPress={cerrarSesion}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileText: {
    marginTop: 20,
    alignItems: "center",
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
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  btnContainer: {
    width: "100%",
  },
  btn: {
    backgroundColor: "#0e639c",
    borderRadius: 4,
  },
});
