import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Icon } from "react-native-elements";

const ChangeStateCandidate = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const SelectImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
        Alert.alert('Permission to access camera roll is required!');
        return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
        setSelectedImage(result.uri);
        }
    };

    const TakeImage = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
        Alert.alert('Permission to access camera roll is required!');
        return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality:1,
            allowsEditing: true,
        });

        if (!result.canceled) {
        setSelectedImage(result.uri);
        }
    };

    return (
        <View>
            {selectedImage ? (
                <>
                    <Image source={{ uri: selectedImage }} style={styles.image} resizeMode="contain" />
                    <Button
                        onPress={()=>console.log("aaaaa")}
                        title={"  Subir"}
                        icon={
                            <Icon
                                type="material-community"
                                name="arrow-up-bold"
                                color="#ffffff"
                            />
                        }
                        buttonStyle={styles.button}
                    />
                </>
                

            ):(
                <>
                    <Text style={styles.noImageText}>Sin imagen</Text>
                    <Button
                        onPress={SelectImage}
                        title={"  Elegir Foto"}
                        icon={
                            <Icon
                                type="material-community"
                                name="image"
                                color="#ffffff"
                            />
                        }
                        buttonStyle={styles.button}
                    />
                    <Button
                        onPress={TakeImage}
                        title={"  Tomar Foto"}
                        icon={
                            <Icon
                                type="material-community"
                                name="camera"
                                color="#ffffff"
                            />
                        }
                        buttonStyle={styles.button}
                
                    />
                </>
                
            )
            
            }

            
            
        </View>
    );
};

const styles = StyleSheet.create({

    image: {
        width: '100%',
        height: 300,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        margin:5
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    noImageText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 40,
        paddingBottom: 40
    }
});

export default ChangeStateCandidate;
