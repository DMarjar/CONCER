import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { Button } from "react-native-elements";
import axios from "../../../../../kernel/gateway/http-auth.gateway";

export default function ChangeTypeCandidate(props) {
  const { payload, setShow } = props;
  const data = JSON.parse(payload);

  const [selectedOption, setSelectedOption] = useState("");
  const options = ["ESTUDIANTE", "PROFESOR", "EXTERNO"];

  const handleOptionSelect = (index, value) => {
    setSelectedOption(value);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.doPut("/person/update", {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        gender: data.gender,
        typePerson: selectedOption,
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
      <Text style={styles.label}>Tipo de Candidato</Text>
      <ModalDropdown
        options={options}
        onSelect={handleOptionSelect}
        defaultValue={selectedOption}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownContainer}
      />

      <Button
        title="Guardar cambios"
        onPress={handleSaveChanges}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        titleStyle={styles.btnTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#bcbcbc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  dropdownContainer: {
    width: "80%",
    height: 100,
  },
  btnContainer: {
    width: "100%",
  },
  btn: {
    backgroundColor: "#0e639c",
    borderRadius: 5,
    paddingVertical: 12,
  },
  btnTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
