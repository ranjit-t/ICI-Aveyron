import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { ScrollView } from "react-native-gesture-handler";

const Signup = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //   const [dob, setDob] = useState(new Date());
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [city, setCity] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");

  const handleSubmit = () => {
    // Add your form submission code here
  };
  return (
    <ScrollView>
      <View style={styles.formPage}>
        <Text style={styles.formTitle}>S'inscrire</Text>
        <View style={styles.signupForm}>
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Prénom(s)</Text>
            <TextInput
              style={styles.formInput}
              value={displayName}
              placeholder="Prénom(s)"
              onChangeText={(text) => setDisplayName(text)}
              required
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Email</Text>
            <TextInput
              style={styles.formInput}
              value={email}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              required
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Mot de passe</Text>
            <TextInput
              style={styles.formInput}
              value={password}
              placeholder="Mot de passe"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              required
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Confirmez le mot de passe</Text>
            <TextInput
              style={styles.formInput}
              value={confirmPassword}
              placeholder="Confirmez le mot de passe"
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={true}
              required
            />
          </View>
          <View>
            <Text style={styles.formLabel}>Date de naissance</Text>
            <View
              style={[
                styles.formField,
                { flexDirection: "row", columnGap: 20 },
              ]}
            >
              <TextInput
                style={styles.formInput}
                placeholder="JJ"
                keyboardType="numeric"
                maxLength={2}
                onChangeText={(text) => setDate(text)}
                value={date}
                required
              />
              <TextInput
                style={styles.formInput}
                placeholder="MM"
                keyboardType="numeric"
                maxLength={2}
                onChangeText={(text) => setMonth(text)}
                value={month}
                required
              />
              <TextInput
                style={styles.formInput}
                placeholder="AAAA"
                keyboardType="numeric"
                maxLength={4}
                onChangeText={(text) => setYear(text)}
                value={year}
                required
              />
            </View>
          </View>
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Ville</Text>
            <TextInput
              style={styles.formInput}
              value={city}
              placeholder="Ville"
              onChangeText={(text) => setCity(text)}
              required
            />
          </View>

          <TouchableOpacity style={styles.formSubmitBtn} onPress={handleSubmit}>
            <Text style={styles.formSubmitBtnText}>S'inscrire</Text>
          </TouchableOpacity>
          <View style={[styles.formMessage, errorClass]}>{errorMessage}</View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  signupForm: {
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
export default Signup;
