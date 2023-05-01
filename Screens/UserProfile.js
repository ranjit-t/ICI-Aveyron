import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { db } from "../Firebase/config";
import { collection, getDocs } from "firebase/firestore";

const UserProfile = ({ route }) => {
  const userUID = route.params.userUID;

  //age
  function calculateAge(timestamp) {
    const birthday = new Date(timestamp * 1000);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  const [count, setCount] = useState(0);
  // const allUsers = useUsers();
  const [allUsers, setAllUsers] = useState([]);

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
        console.error(error);
      }
    };
    fetchUsers();
  }, []);
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

  if (!currUser) {
    return <Text>User Not Found</Text>;
  }

  return (
    <View>
      {/* <Text>hello</Text>
      <Text>{userUID}</Text> */}
      <View style={styles.userProfilePage}>
        <Image
          style={styles.userProfilePhoto}
          source={{ uri: currUser.profilePhoto }}
        />
        <View style={styles.userProfileVerified}>
          <Text
            style={[
              styles.userProfileText,
              { marginVertical: 20, fontWeight: 500 },
            ]}
          >
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
    </View>
  );
};

const styles = StyleSheet.create({
  userProfilePage: {
    // marginTop: 85,
    alignItems: "center",
    borderColor: "#008cba",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    margin: 60,
  },
  userProfileText: {
    fontSize: 20,
    marginTop: 20,
  },
  userProfilePhoto: {
    width: 200,
    height: 200,
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
    padding: 10,
    color: "white",
    fontSize: 20,
  },
});

export default UserProfile;
