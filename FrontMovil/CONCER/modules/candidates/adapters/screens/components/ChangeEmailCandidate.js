import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-elements";
import axios from "../../../../../kernel/gateway/http-auth.gateway";

export default function ChangeEmailCandidate(props) {
  const { payload, setShow } = props;
  const data = JSON.parse(payload);

  const [newEmail, setNewEmail] = useState(data.email);

  const handleSaveChanges = async () => {
    try {
      await axios.doPut("/person/update", {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: newEmail,
        gender: data.gender,
        typePerson: data.typePerson,
        status: data.status,
        user: data.user,
      });
      setShow(false);
    } catch (error) {
      console.log("Error al actualizar el nombre: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email</Text>
      <TextInput
        value={newEmail}
        onChangeText={(text) => setNewEmail(text)}
        style={styles.input}
      />
      <Button
        title="Guardar cambios"
        onPress={handleSaveChanges}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 35,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    fontSize: 16,
  },
  btnContainer: {
    width: "100%",
  },
  btn: {
    backgroundColor: "#0e639c",
    borderRadius: 4,
  },
});
