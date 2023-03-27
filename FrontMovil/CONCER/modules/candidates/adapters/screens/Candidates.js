import React, {useState, useEffect} from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "../../../../kernel/gateway/http-auth.gateway"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Candidates() {
    const [account, setAccount] = useState({});
    const [data, setData] = useState([]);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.doPost('/candidate/information',{
                id: account.id
            });
            setData(response.data.data);

            } catch (error) {
                console.log(error);
            }
        };
        if (account.id) {
            fetchData();
        }
    }, [account]);

    const navigation = useNavigation();

    const handleCandidatePress = (candidateId) => {
        navigation.navigate("Candidatura", { candidateId });
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.item}
                        onPress={() => handleCandidatePress(item[2])}
                    >


                        <View style={styles.itemContent}>

                            <View style={styles.itemInfo}>
                                <Text style={styles.name}>{`${item[4]} ${item[5]}`}</Text>
                                <Text style={styles.certification}>{item[3]}</Text>
                            </View>

                            <Image source={require("../../../../assets/favicon.png")} style={styles.icon} />
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
        certification: {
            
        },
        icon: {
            width: 30,
            height: 30,
        },
    });