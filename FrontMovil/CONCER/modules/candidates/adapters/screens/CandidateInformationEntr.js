import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Button, Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import axios from "../../../../kernel/gateway/http-auth.gateway";
import MyModal from "../../../../kernel/components/Modal";
import ChangeStateCandidate from "./components/ChangeStateCandidate";
import { useNavigation } from "@react-navigation/native";

const placeholderImage = require("../../../../assets/icon.png");

export default function Candidato() {
  const [showModal, setShowModal] = useState(false);
  const Navigator = useNavigation();
  const temporal = false;
  const [data, setdata] = useState([]);
  const route = useRoute();
  const { candidateId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.doPost("/candidate/candidature", {
          id: candidateId,
        });
        setdata(response.data.data[0]);
        console.log(response.data.data[0]);
      } catch (error) {
        console.log("Error al obtener los datos de la cuenta: ", error);
      }
    };

    fetchData();
  }, [candidateId]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image source={placeholderImage} style={styles.profileImage} />
          </View>
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
            <Icon
              name="email-outline"
              type="material-community"
              size={24}
              color="#a1a1a1"
            />
            <Text style={styles.infoText}>{data[6]}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon
              name="phone-outline"
              type="material-community"
              size={24}
              color="#a1a1a1"
            />
            <Text style={styles.infoText}>{data[7]}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon
              name="gender-male-female"
              type="material-community"
              size={24}
              color="#a1a1a1"
            />
            <Text style={styles.infoText}>{data[5]}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>TIPO:</Text>
            <Text style={styles.infoText}>{data[8]}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>ACADEMIA:</Text>
            <Text style={styles.infoText}>{data[9]}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>
            Información de la certificación
          </Text>

          <View style={styles.infoRow}>
            <Icon
              name="certificate-outline"
              type="material-community"
              size={24}
              color="#a1a1a1"
            />
            <Text style={styles.infoText}>{data[11]}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon
              name="file-certificate-outline"
              type="material-community"
              size={24}
              color="#a1a1a1"
            />
            <Text style={styles.infoText}>{data[12]}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon
              name="domain"
              type="material-community"
              size={24}
              color="#a1a1a1"
            />
            <Text style={styles.infoText}>{data[13]}</Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          {temporal ? (
            <Image source={{ uri: data[14] }} style={styles.image} />
          ) : (
            <Text style={styles.noImageText}>Sin imagen</Text>
          )}
        </View>
      </ScrollView>

      <MyModal show={showModal} setShow={setShowModal}>
        <ChangeStateCandidate />
      </MyModal>

      <View style={styles.actionSection}>
        <Button
          icon={
            <Icon
              type="material-community"
              name="arrow-up-bold"
              color="#ffffff"
            />
          }
          title=" Actualizar Estado"
          containerStyle={styles.editButtonContainer}
          buttonStyle={styles.editButton}
          onPress={() => setShowModal(!showModal)}
        />

        <Button
          icon={
            <Icon type="material-community" name="pencil" color="#ffffff" />
          }
          title=" Editar informacion"
          containerStyle={styles.editButtonContainer}
          buttonStyle={styles.editButton}
          onPress={() => Navigator.navigate("Editar Informacion", { data })}
        />
      </View>
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
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
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
    marginBottom: 20,
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
