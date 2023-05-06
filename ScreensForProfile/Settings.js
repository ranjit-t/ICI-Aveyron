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
  const [dob, setDob] = useState("18-07-1994");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [message, setMessage] = useState("");

  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  // console.log(currUser);
  // console.log(profilePhoto);

  // const handleNameChange = (e) => {
  //   setName(e.target.value);
  // };

  // const handleCityChange = (e) => {
  //   setCity(e.target.value);
  // };

  // const handleDobChange = (date) => {
  //   setDob(date);
  // };

  // const handleProfilePhotoChange = (e) => {
  //   setProfilePhoto(e.target.files[0]);
  // };
  const renderPhoto = () => {
    return (
      <Text style={{ fontSize: 16, marginTop: 10 }}>
        Veuillez choisir une photo
      </Text>
    );
  };

  const options = {
    mediaType: "photo",
    includeBase64: true,
    maxHeight: 500,
    maxWidth: 500,
  };

  const handleChoosePhoto = () => {
    const options = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.5,
      includeBase64: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setPhoto(response);
      }
    });
  };

  return (
    <View style={styles.profileSettings}>
      <View style={styles.profileSetting}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          // value={currUser.email}
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
        <TextInput
          style={styles.input}
          // value={city}
          // onChangeText={handleCityChange}
          placeholder="Date"
        />
        {/* <DatePicker
          style={styles.datePicker}
          date={dob}
          // onDateChange={handleDobChange}
          mode="date"
          placeholder="Date de naissance"
          format="DD/MM/YYYY"
          showIcon={false}
        /> */}
      </View>
      <Text>Hey</Text>

      <View style={styles.imagecontainer}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.image} />
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
});

export default Settings;
