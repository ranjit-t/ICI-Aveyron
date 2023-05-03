import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Organise = () => {
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement form submission
  };

  const handleNotLoggedIn = () => {
    setErrorMessage("Veuillez vous connecter pour accéder à cette page");
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Organiser une sortie</Text>
        {1 === 1 ? (
          <View>
            <Text style={styles.inputIntoText}>Title :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setActivityName(value)}
              value={activityName}
              placeholder="Nom de l'activité"
              required
            />

            <Text style={styles.inputIntoText}>Description :</Text>
            <TextInput
              style={styles.textInputWithBorder}
              multiline={true}
              numberOfLines={4} // You can set this value to your desired number of lines
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder="Décrivez votre activité"
              required
            />
            <Text style={styles.inputIntoText}>Date :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setDate(value)}
              value={date}
              placeholder="Date"
              required
            />
            <Text style={styles.inputIntoText}>Heure de départe :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setTime(value)}
              value={time}
              placeholder="Heure de départ"
              required
            />
            <Text style={styles.inputIntoText}>Adress :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setAddress(value)}
              value={address}
              placeholder="Adresse"
              required
            />
            <Text style={styles.inputIntoText}>Ville :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setCity(value)}
              value={city}
              placeholder="Ville"
              required
            />
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.pageButton}>Créer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.notLoggedIn}>
            <Text>Veuillez vous connecter pour accéder à cette page</Text>
          </View>
        )}
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textInputWithBorder: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 100,
    minWidth: 350,
  },
  notLoggedIn: {
    marginTop: 20,
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#226000",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  pageButton: {
    fontSize: 20,
    height: 35,
    color: "white",
    backgroundColor: "#226000",
    padding: 5,
    textAlign: "center",
    // paddingHorizontal: 10,
    // marginHorizontal: 10,
    // borderRadius: 10,
    // marginTop: 10,
  },
});

export default Organise;
