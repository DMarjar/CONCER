import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "../../../../kernel/gateway/http-auth.gateway";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import { Input, Icon } from "@rneui/base";

export default function CandidatesEntr() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [account, setAccount] = useState({});
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //obtener datos de la cuenta
        const accountData = await AsyncStorage.getItem("account");
        const parsedAccount = JSON.parse(accountData);
        setAccount(parsedAccount);

        //obtener datos de los candidatos con el id de la cuenta
        const response = await axios.doPost(
          "/candidate/informationEntregadas",
          {
            id: parsedAccount.id,
          }
        );
        setData(response.data.data);

        //filtrar los datos de los candidatos
        const filteredResults = response.data.data.filter((item) => {
          const fullName = `${item[4]} ${item[5]}`.toLowerCase();
          return fullName.includes(searchTerm.toLowerCase());
        });
        setFilteredData(filteredResults);
      } catch (error) {
        console.log(error);
      }
    };

    if (isFocused) {
      //si el componente esta enfocado, se ejecuta la funcion
      fetchData();
      //se reinicia el estado de refresh
      setRefresh(false);
    }
  }, [isFocused, searchTerm, refresh]);

  //si el componente esta enfocado, se ejecuta la funcion
  useFocusEffect(
    useCallback(() => {
      setRefresh(true);
    }, [])
  );

  const handleCandidatePress = (candidateId) => {
    navigation.navigate("Informacion", { candidateId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Buscar candidato"
          style={styles.searchInput}
          rightIcon={
            <Icon type="material-community" name="magnify" size={30} />
          }
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      <ScrollView>
        {filteredData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => handleCandidatePress(item[1])}
          >
            <View style={styles.itemContent}>
              <View style={styles.itemInfo}>
                <Text style={styles.name}>{`${item[4]} ${item[5]}`}</Text>
                <Text style={styles.certification}>{item[3]}</Text>
              </View>

              <Image
                source={require("../../../../assets/favicon.png")}
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F2F2F2",
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  certification: {},
  icon: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    borderRadius: 5,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingTop: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
});
