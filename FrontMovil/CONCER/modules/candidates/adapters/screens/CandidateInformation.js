import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from "react-native";
import { Button, Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import React from 'react'

export default function CandidateInformation() {

  const route = useRoute();
  const { data } = route.params;
  const [showModal,setShowModal]= useState(false);
  const selectComponent = (name) =>{
    switch(name){
      case "Name":
        break;
      case "Lastname":
        break;
      case "Gender":
        break;
      case "Email":
        break;
      case "Phone":
        break;
      case "Type":
        break;
      case "Academy":
        break;
      case "NameCertification":
        break;
      case "Version":
        break;
      case "Company":
        break;
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
      
        <View style={styles.card}>
          <Text style={styles.title}>Información del candidato</Text>

          <TouchableOpacity onPress={selectComponent("Name")}>
            <View style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.label}>Nombre: </Text>
                  <Text>{data[3]}</Text>
                </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={selectComponent("Lastname")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Apellidos: </Text>
                <Text>{data[4]}</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={selectComponent("Gender")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Sexo: </Text>
                <Text>{data[5]}</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={selectComponent("Email")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Email: </Text>
                <Text>{data[6]}</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={selectComponent("Phone")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Telefono: </Text>
                <Text>{data[7]}</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={selectComponent("Type")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Tipo: </Text>
                <Text>{data[8]}</Text>
              </View>
            </View>
          </TouchableOpacity>

          
          <TouchableOpacity onPress={selectComponent("Academy")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Academia: </Text>
                <Text>{data[9]}</Text>
              </View>
            </View>
          </TouchableOpacity>
          

        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Información de la certificación</Text>

          <TouchableOpacity onPress={selectComponent("NameCertification")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Nombre de la certificación: </Text>
                <Text>{data[11]}</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={selectComponent("Version")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Versión: </Text>
                <Text>{data[12]}</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={selectComponent("Company")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Empresa certificadora: </Text>
                <Text>{data[13]}</Text>
              </View>
            </View>
          </TouchableOpacity>
          
        </View>
      
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#fff",
  padding: 20,
  },
  card: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 5,
  padding: 10,
  marginBottom: 20,
  },
  title: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 10,
  },
  row: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 5,
  },
  label: {
  fontWeight: "bold",
  marginRight: 10,
  },
  containerBTN: {
    position: "absolute",
    bottom: 10,
    right: 10,
    marginHorizontal:30,
    marginVertical:20
  },
  button: {
    backgroundColor: "#094670",
    borderRadius: 50,
    width: 70,
    height: 70,
  },
  });
