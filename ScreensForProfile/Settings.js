import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Button,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

import { db, storage, auth } from "../Firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

import DateTimePicker from "@react-native-community/datetimepicker";
import { launchCameraAsync } from "expo-image-picker";

import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const [name, setName] = useState("Ranjit");
  const [city, setCity] = useState("Rodez");
  const [dob, setDob] = useState("18-07-1994");
  const [date, setDate] = useState(new Date("1994-07-18"));
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [message, setMessage] = useState("");

  const [datePicker, setDatePicker] = useState(false);

  const navigation = useNavigation();

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
  }

  //Image Picker

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only show images
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const response = await fetch(result.uri);
      const blob = await response.blob();
      setProfileImage(blob);
    }
  };

  const cameraHandler = async () => {
    let result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const response = await fetch(result.uri);
      const blob = await response.blob();
      setProfileImage(blob);
    }
  };

  //Firebase

  const handleSaveChanges = async () => {
    if (profileImage) {
      console.log("step1");
      let photoURL;
      const imageRef = ref(storage, `amailtoranjith@gmail.com.jpg`);

      const uploadTask = uploadBytesResumable(imageRef, profileImage);

      // Wait for the upload task to complete before updating the profile photo URL
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            reject(error);
            console.log("step2");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                // setProfilePhotoURL(downloadURL);
                photoURL = downloadURL;
                console.log("step3");
                resolve();
              })
              .catch((error) => {
                reject(error);
                console.log("step4");
              });
          }
        );
      });

      const userDocRef = doc(db, "users", "YDmNFX3RGsO9d2vEllwT7ItrfX82");
      const userDoc = await getDoc(userDocRef);
      console.log("step5");
      try {
        if (userDoc.exists()) {
          const updatedFields = {};
          // if (name !== currUser.displayName) {
          updatedFields.displayName = name;
          updatedFields.profilePhoto = photoURL;
          // }
          // if (city !== currUser.city) {
          updatedFields.city = city;
          updatedFields.profilePhoto = photoURL;
          // }
          // if (dob.getTime() !== currUser.dob.toDate().getTime()) {
          updatedFields.dob = date;
          updatedFields.profilePhoto = photoURL;
          // }
          await updateDoc(userDocRef, updatedFields);
          console.log("step6");
          // const user = auth.currentUser;
          //   await updateProfile(user, {
          //     displayName: name,
          //     photoURL: photoURL,
          //     dob: date,
          //   });
          console.log("step7");
          navigation.navigate("Profile", {
            reload: Math.random(),
          });
        }
      } catch (e) {
        // console.log(e.message);
        // setMessage("Oops, there is an error");
        setMessage(e.message);
        console.log("step8");
      }
    } else {
      const userDocRef = doc(db, "users", "YDmNFX3RGsO9d2vEllwT7ItrfX82");
      const userDoc = await getDoc(userDocRef);
      try {
        if (userDoc.exists()) {
          const updatedFields = {};
          // if (name !== currUser.displayName) {
          updatedFields.displayName = name;
          // }
          // if (city !== currUser.city) {
          updatedFields.city = city;
          // }
          // if (dob.getTime() !== currUser.dob.toDate().getTime()) {
          updatedFields.dob = date;
          // }
          await updateDoc(userDocRef, updatedFields);
          // console.log("updated");
          // const user = auth.currentUser;
          // await updateProfile(user, {
          //   displayName: name,
          //   dob: date,
          // });
          setMessage("Changes Saved!");
        }
      } catch (e) {
        // console.log(e.message);
        // setMessage("Oops, there is an error");
        setMessage(e.message);
      }
    }
  };

  return (
    <ScrollView>
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
            onChangeText={(value) => {
              setName(value);
            }}
            placeholder="Prénom(s)"
          />
        </View>
        <View style={styles.profileSetting}>
          <Text style={styles.label}>Ville:</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={(value) => {
              setCity(value);
            }}
            placeholder="Ville"
          />
        </View>

        <View style={styles.profileSetting}>
          <Text style={styles.label}>Date de naissance:</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={[styles.input, { padding: 10 }]}>{dob && dob}</Text>
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
        <View style={[styles.profileSetting, { marginTop: -20 }]}>
          <Text style={styles.label}>Profile Photo</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={pickImage}>
              <Text style={[styles.input, { margin: 30 }]}>Take Picture</Text>
            </TouchableOpacity>
            <Text style={styles.text}>or</Text>
            <TouchableOpacity onPress={cameraHandler}>
              <Text style={[styles.input, { margin: 30 }]}>Use Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
        {image && (
          <View style={[styles.profileSetting, styles.profileSettingImage]}>
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>

        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 650,
    paddingVertical: 20,
  },
  profileSetting: {
    marginHorizontal: 20,
    width: "80%",
    // maxHeight: 50,
    marginVertical: 20,
  },
  profileSettingImage: {
    alignItems: "center",
    justifyContent: "center",
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
    padding: 5,
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
    fontSize: 17,
    padding: 3,
    marginTop: 13,
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
