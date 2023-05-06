import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
// import ImagePicker from "react-native-image-picker";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { db, storage, auth } from "../Firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";

import DateTimePicker from "@react-native-community/datetimepicker";

const Settings = () => {
  const [name, setName] = useState("Ranjit");
  const [city, setCity] = useState("Rodez");
  const [dobBefore, setDobBeforeFormat] = useState("");
  const [dob, setDob] = useState("18-07-1994");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [message, setMessage] = useState("");

  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    const date = new Date(value);
    const formatter = new Intl.DateTimeFormat("en-UK", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedDate = formatter.format(date).split("/").join("-");
    setDob(formattedDate);

    setDatePicker(false);
    // console.log(value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileSetting}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={[styles.input]}
          // value={currUser.email}
          value="amailtoranjith@gmail.com"
          editable={false}
        />
      </View>
      <View style={styles.profileSetting}>
        <Text style={styles.label}>Prénom(s) :</Text>
        <TextInput
          style={styles.input}
          value={name}
          // onChangeText={handleNameChange}
          placeholder="Prénom(s)"
        />
      </View>
      <View style={styles.profileSetting}>
        <Text style={styles.label}>Ville:</Text>
        <TextInput
          style={styles.input}
          value={city}
          // onChangeText={handleCityChange}
          placeholder="Ville"
        />
      </View>

      <View style={styles.profileSetting}>
        <Text style={styles.label}>Date de naissance:</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.input}>{dob && dob}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileSetting}>
        {datePicker && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onDateSelected}
            style={styles.datePicker}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        // onPress={handleSaveChanges}
      >
        <Text style={styles.buttonText}>Modifier</Text>
      </TouchableOpacity>

      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileSetting: {
    marginHorizontal: 20,
    width: "80%",
    maxHeight: 50,
    marginVertical: 20,
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#226000",
  },
  button: {
    backgroundColor: "#226000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#226000",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  imagecontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },

  MainContainer: {
    // flex: 1,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    // width: 400,
    flexDirection: "row",
  },

  text: {
    fontSize: 25,
    color: "red",
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
});

export default Settings;
