import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { Button, Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import axios from "../../../../kernel/gateway/http-auth.gateway";
import MyModal from "../../../../kernel/components/Modal";
import ChangeStateCandidate from "./components/ChangeStateCandidate";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../../../kernel/components/Loading";

const placeholderImage = require("../../../../assets/icon.png");

export default function Candidato() {
  const [showModal, setShowModal] = useState(false);
  const Navigator = useNavigation();
  const temporal = false;
  const [data, setdata] = useState([]);
  const route = useRoute();
  const { candidateId } = route.params;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.doPost("/candidate/candidature", {
          id: candidateId,
        });
        setdata(response.data.data[0]);
      } catch (error) {
        Alert.alert("Vaya..", "Ocurrio un error al cargar los datos");
        Navigator.goBack();
      }
    };

    fetchData();
    setLoading(false);
  }, [candidateId]);

  useEffect(() => {
    setLoading(!loading);
  }, [data]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.profileName}>
            {data[3]} {data[4]}
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Estado de la certificacion</Text>
          <Text style={styles.infoText}>{data[10]}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Información personal</Text>

          <View style={styles.infoRow}>
            <Text>Email: </Text>
            <Text style={styles.infoText}>{data[6]}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>Telefono: </Text>
            <Text style={styles.infoText}>{data[7]}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>Sexo: </Text>
            <Text style={styles.infoText}>{data[5]}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Tipo:</Text>
            <Text style={styles.infoText}>{data[8]}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Academia:</Text>
            <Text style={styles.infoText}>{data[9]}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>
            Información de la certificación
          </Text>

          <View style={styles.infoRow}>
            <Text>Certificación: </Text>
            <Text style={styles.infoText}>{data[11]}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>Version: </Text>
            <Text style={styles.infoText}>{data[12]}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>Empresa: </Text>
            <Text style={styles.infoText}>{data[13]}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>Gestor: </Text>
            <Text style={styles.infoText}>{data[14]}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>Fecha de finalizacion: </Text>
            <Text style={styles.infoText}>{data[18]}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>Clave: </Text>
            <Text style={styles.infoText}>{data[15]}</Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:image/png;base64,${data[19]}` }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </ScrollView>

      <MyModal show={showModal} setShow={setShowModal}>
        <ChangeStateCandidate />
      </MyModal>

      <Loading setShow={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoSection: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
  },
  actionSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
  editButtonContainer: {
    flex: 1,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: "#0e639c",
    borderRadius: 8,
    padding: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  imageContainer: {
    height: 150,
    margin: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  noImageText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 80,
  },
});
