import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { db } from "../Firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const Profile = () => {
  const userUID = "YDmNFX3RGsO9d2vEllwT7ItrfX82";
  const navigation = useNavigation();
  const route = useRoute();
  let reload = route.params?.reload;
  //age
  function calculateAge(timestamp) {
    const birthday = new Date(timestamp * 1000);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  const [count, setCount] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [userFetchFailed, setUserFetchFailed] = useState(false);

  //Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const colRef = collection(db, "users");
        const docsSnap = await getDocs(colRef);
        let usersArray = [];
        docsSnap.forEach((doc) => {
          usersArray.push(doc.data());
        });
        setAllUsers(usersArray);
      } catch (error) {
        // console.error(error);
        setUserFetchFailed(true);
      }
    };
    fetchUsers();
  }, [reload]);
  const currUser = allUsers.filter((user) => user.userID === userUID)[0];

  const achievedscore = currUser
    ? parseInt(currUser.participated.length) * 5 +
      parseInt(currUser.organized.length) * 20
    : 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count < achievedscore) {
        setCount((prevCount) => prevCount + 1);
      }
    }, 3);
    return () => clearInterval(intervalId);
  }, [count, achievedscore]);

  // if (userFetchFailed) {
  //   return (
  //     <View style={{ alignItems: "center", marginTop: 50 }}>
  //       <Text style={{ color: "#226000" }}>Oops,</Text>
  //     </View>
  //   );
  // }

  if (!currUser) {
    return (
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <Text style={{ color: "#226000" }}>...Chargement</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.userProfilePage}>
        <Image
          style={styles.userProfilePhoto}
          source={{ uri: currUser.profilePhoto }}
        />
        <View style={styles.userProfileVerified}>
          <Text style={[styles.userProfileText, { fontWeight: 500 }]}>
            {currUser ? currUser.displayName : "User"}
          </Text>
          {/* {currUser.verified && (
            <Image
              style={styles.userProfileVerifiedIcon}
              source={require("./verified.png")}
            />
          )} */}
        </View>
        <Text style={styles.karmaScore}>
          <Text style={{ fontWeight: 500, fontSize: 20 }}>Karma Score : </Text>
          {count}
        </Text>
        <Text style={styles.userProfileText}>
          <Text style={{ fontWeight: 500 }}>Âge : </Text>
          {currUser ? calculateAge(currUser.dob.seconds) : "19"}
        </Text>
        <Text style={styles.userProfileText}>
          <Text style={{ fontWeight: 500 }}>Ville : </Text>
          {currUser ? currUser.city : "Rodez"}
        </Text>
        <Text style={styles.userProfileText}>
          <Text style={{ fontWeight: 500 }}>Activités Organisées : </Text>
          {currUser ? currUser.organized.length : "0"}
        </Text>
        <Text style={styles.userProfileText}>
          <Text style={{ fontWeight: 500 }}>Activités Participé : </Text>
          {currUser ? currUser.participated.length : "0"}
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={styles.profileButtons}
          onPress={() => {
            navigation.navigate("Organise", {
              userUID: userUID,
            });
          }}
        >
          <Text style={styles.buttonText}>Organiser</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileButtons}
          onPress={() => {
            navigation.navigate("MySorties", {
              userUID: userUID,
            });
          }}
        >
          <Text style={styles.buttonText}>Mes Sorties</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileButtons}
          onPress={() => {
            navigation.navigate("MyParticipations", {
              userUID: userUID,
            });
          }}
        >
          <Text style={styles.buttonText}>Mes Participations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.profileButtons, { marginBottom: 20 }]}
          onPress={() => {
            navigation.navigate("Settings", {
              userUID: userUID,
            });
          }}
        >
          <Text style={styles.buttonText}>Paramètres</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userProfilePage: {
    // marginTop: 85,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "#226000",
    // borderWidth: 1,
    // borderRadius: 20,
    padding: 20,
    // margin: 60,
  },
  userProfileText: {
    fontSize: 20,
    marginTop: 5,
  },
  userProfilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  userProfileVerified: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  userProfileVerifiedIcon: {
    width: 25,
    height: 25,
  },
  karmaScore: {
    backgroundColor: "#b04a25",
    padding: 5,
    color: "white",
    fontSize: 18,
  },
  profileButtons: {
    backgroundColor: "#226000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: 220,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Profile;
