import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth } from "../Firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      //   alert("signined");
      navigation.navigate("Profile", {
        reload: Math.random(),
      });
      //   console.log("logged in");
    } catch (error) {
      setErrorMessage("Oups, il y a une erreur");
    }
  };

  return (
    <View style={styles.formPage}>
      <Text style={styles.formTitle}>Connexion</Text>
      <View style={styles.loginForm}>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Email</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            required
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.formLabel}>Mot de passe</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            required
          />
        </View>

        <TouchableOpacity style={styles.formSubmitBtn} onPress={handleSubmit}>
          <Text style={styles.formSubmitBtnText}>Connexion</Text>
        </TouchableOpacity>
      </View>
      {errorMessage && (
        <View style={styles.formError}>
          <Text>{errorMessage}</Text>
        </View>
      )}
      <TouchableOpacity
        style={{ cursor: "pointer", marginTop: 40 }}
        // onPress={() => {
        //   navigation.navigate("Signup");
        // }}
      >
        <Text>Vous n'avez pas de compte ?</Text>
        <Text style={{ fontWeight: "bold" }}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  loginForm: {
    width: "80%",
  },
  formField: {
    marginBottom: 20,
  },
  formLabel: {
    marginBottom: 5,
  },
  formInput: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#226000",
    borderRadius: 4,
    padding: 5,
    marginBottom: 10,
  },
  formSubmitBtn: {
    backgroundColor: "#226000",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  formSubmitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  formError: {
    backgroundColor: "#ffebee",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default Login;
