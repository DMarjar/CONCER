<<<<<<< Updated upstream
import React from "react";
import { View, Text} from "react-native";

export default function Candidates() {
    return(
        <View>
            <Text>candidates</Text>
=======
import React, {useState, useEffect} from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "../../../../kernel/gateway/http-auth.gateway"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Candidate from './Candidate';

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
                const response = await axios.doPost('/certification/information',{
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
        //navigation.navigate("CandidateInfo", { candidateId });
        navigation.navigate("Candidato")
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.item}
                        onPress={() => handleCandidatePress(item[0])}
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
>>>>>>> Stashed changes
        </View>
    );
}