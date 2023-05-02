import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.title}>Créer une activité</Text>
      {1 === 1 ? (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setActivityName(value)}
            value={activityName}
            placeholder="Nom de l'activité"
            required
          />
          {/* <TextInput
            style={styles.input}
            onChangeText={(value) => setDescription(value)}
            value={description}
            placeholder="Décrivez votre activité"
            required
          /> */}
          <TextInput
            style={styles.textInputWithBorder}
            multiline={true}
            numberOfLines={4} // You can set this value to your desired number of lines
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder="Décrivez votre activité"
            required
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setDate(value)}
            value={date}
            placeholder="Date"
            required
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setTime(value)}
            value={time}
            placeholder="Heure de départ"
            required
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setAddress(value)}
            value={address}
            placeholder="Adresse"
            required
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setCity(value)}
            value={city}
            placeholder="Ville"
            required
          />
          <Button title="Créer" onPress={handleSubmit} style={styles.button} />
        </View>
      ) : (
        <View style={styles.notLoggedIn}>
          <Text>Veuillez vous connecter pour accéder à cette page</Text>
        </View>
      )}
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
    height: 100, // You can set this value to your desired height
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
});

export default Organise;
