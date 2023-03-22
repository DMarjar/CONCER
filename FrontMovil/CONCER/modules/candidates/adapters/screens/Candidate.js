import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Candidate = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{uri: 'https://via.placeholder.com/150'}}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Nombre del candidato</Text>
        <Text style={styles.email}>Correo electrónico</Text>
        <Text style={styles.academy}>Academia</Text>
        <Text style={styles.career}>Carrera</Text>
        <Text style={styles.phone}>Teléfono</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    marginBottom: 8,
  },
  academy: {
    fontSize: 16,
    marginBottom: 8,
  },
  career: {
    fontSize: 16,
    marginBottom: 8,
  },
  phone: {
    fontSize: 16,
    marginBottom: 8,
  },
  certificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  certificationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  certificationInfo: {
    flex: 1,
  },
  certificationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  certificationVersion: {
    fontSize: 16,
    marginBottom: 4,
  },
  certificationStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default Candidate;
