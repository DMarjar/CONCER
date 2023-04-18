import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import Modal from "../../../../kernel/components/Modal";
import axios from "../../../../kernel/gateway/http-auth.gateway";
import Loading from "../../../../kernel/components/Loading";
import { Button, Icon } from "react-native-elements";

import ChangeNameCandidate from "./components/ChangeNameCandidate";
import ChangeLastnameCandidate from "./components/ChangeLastnameCandidate";
import ChangeGenderCandidate from "./components/ChangeGenderCandidate";
import ChangeEmailCandidate from "./components/ChangeEmailCandidate";
import ChangePhoneCandidate from "./components/ChangePhoneCandidate";
import ChangeTypeCandidate from "./components/ChangeTypeCandidate";
import ChangeAcademyCandidate from "./components/ChangeAcademyCandidate";
import ChangeStateCandidate from "./components/ChangeStateCandidate";

export default function CandidateInformation() {
  const route = useRoute();
  const { candidateId } = route.params;
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

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
  }, [candidateId, showModal]);

  const informationPerson = async () => {
    try {
      setLoading(true);
      let response = await axios.doPost("/person/one", {
        email: data[6],
      });
      setLoading(false);
      return response.data.data;
    } catch (error) {
      setLoading(false);
    }
  };

  const informationAcademy = async () => {};

  const informationCertification = async () => {};

  const selectComponent = async (name) => {
    switch (name) {
      case "Name":
        let NameJson = await informationPerson();
        setRenderComponent(
          <ChangeNameCandidate
            payload={JSON.stringify(NameJson)}
            setShow={setShowModal}
          />
        );
        setShowModal(true);
        break;
      case "Lastname":
        let LastnameJson = await informationPerson();
        setRenderComponent(
          <ChangeLastnameCandidate
            payload={JSON.stringify(LastnameJson)}
            setShow={setShowModal}
          />
        );
        setShowModal(true);
        break;
      case "Gender":
        let GenderJson = await informationPerson();
        setRenderComponent(
          <ChangeGenderCandidate
            payload={JSON.stringify(GenderJson)}
            setShow={setShowModal}
          />
        );
        setShowModal(true);
        break;
      case "Email":
        let EmailJson = await informationPerson();
        setRenderComponent(
          <ChangeEmailCandidate
            payload={JSON.stringify(EmailJson)}
            setShow={setShowModal}
          />
        );
        setShowModal(true);
        break;
      case "Phone":
        let PhoneJson = await informationPerson();
        setRenderComponent(
          <ChangePhoneCandidate
            payload={JSON.stringify(PhoneJson)}
            setShow={setShowModal}
          />
        );
        setShowModal(true);
        break;
      case "Type":
        let TypeJson = await informationPerson();

        setRenderComponent(
          <ChangeTypeCandidate
            payload={JSON.stringify(TypeJson)}
            setShow={setShowModal}
          />
        );
        setShowModal(true);
        break;

      case "Certification":
        setRenderComponent(<ChangeCertificationCandidate />);
        setShowModal(true);
        break;
      case "Version":
        setRenderComponent(<ChangeVersionCandidate />);
        setShowModal(true);
        break;
      case "Company":
        setRenderComponent(<ChangeCompanyCandidate />);
        setShowModal(true);
        break;
      case "State":
        setRenderComponent(
          <ChangeStateCandidate payload={candidateId} setShow={setShowModal} />
        );
        setShowModal(true);
        break;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Estado</Text>
          <View style={styles.row}>
            <Text>{data[10]}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Información del candidato</Text>

          <TouchableOpacity onPress={() => selectComponent("Name")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Nombre: </Text>
                <Text>{data[3]}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectComponent("Lastname")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Apellidos: </Text>
                <Text>{data[4]}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectComponent("Gender")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Sexo: </Text>
                <Text>{data[5]}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectComponent("Email")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Email: </Text>
                <Text>{data[6]}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectComponent("Phone")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Telefono: </Text>
                <Text>{data[7]}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectComponent("Type")}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Tipo: </Text>
                <Text>{data[8]}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectComponent("Academy")}>
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

          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Nombre de la certificación: </Text>
              <Text>{data[11]}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Versión: </Text>
              <Text>{data[12]}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Empresa certificadora: </Text>
              <Text>{data[13]}</Text>
            </View>
          </View>
        </View>
        {renderComponent && (
          <Modal show={showModal} setShow={setShowModal}>
            {renderComponent}
          </Modal>
        )}

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
            onPress={() => selectComponent("State")}
          />
        </View>

        <Loading setShow={loading} text="" />
      </View>
      <Loading setShow={loading} />
    </ScrollView>
  );
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
    marginHorizontal: 30,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#094670",
    borderRadius: 50,
    width: 70,
    height: 70,
  },
  actionSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
  editButtonContainer: {
    flex: 1,
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
