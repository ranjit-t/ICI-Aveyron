import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db, signedUser, auth } from "../Firebase/config";

const EachSortie = ({ route }) => {
  const eventID = route.params.eventID;
  const [act, setAct] = useState([]);
  const now = new Date().getTime(); // get the current time

  useEffect(() => {
    const fetchActivities = async () => {
      let activitiesArray = [];
      try {
        const colRef = collection(db, "activities");
        const docsSnap = await getDocs(colRef);
        docsSnap.forEach((doc) => {
          activitiesArray.push(doc.data());
        });
        setAct(
          activitiesArray.filter((act) => act.id === parseInt(eventID))[0]
        );
      } catch (error) {
        alert(error);
      }
    };
    fetchActivities();
  }, [eventID]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginVertical: 20 }}>
          {act.name}
        </Text>

        <View style={styles.activityDescriptionContainer}>
          <Text style={styles.activityDescription}>{act.description}</Text>
        </View>
        <View>
          <Text style={styles.activityText}>
            <Text style={{ fontWeight: "bold" }}>Date: </Text>
            {act.date}
          </Text>
        </View>
        <View>
          <Text style={styles.activityText}>
            <Text style={{ fontWeight: "bold" }}>Timings: </Text>
            {act.timing}
          </Text>
        </View>
        <View>
          <Text style={styles.activityText}>
            <Text style={{ fontWeight: "bold" }}>Adresse: </Text>
            {act.address}, {act.city}
          </Text>
        </View>
        <View>
          <Text
            style={[styles.activityText, { fontWeight: "bold", marginTop: 10 }]}
          >
            Organisé par:{" "}
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.activityText,
              {
                color: "#097396",
                fontWeight: "bold",
              },
            ]}
            onPress={() => {
              //   navigate(`/user-profile/${act.uid}`);
            }}
          >
            {act.organizer}
          </Text>
        </View>
        <View>
          <Text
            style={[styles.activityText, { fontWeight: "bold", marginTop: 10 }]}
          >
            Qui arrive:{" "}
          </Text>
        </View>
        <View>
          <Text style={{ flexDirection: "row" }}>
            {act.participants &&
              act.participants.map((part, idx) => {
                const isLast = idx === act.participants.length - 1;
                const separator = isLast ? "" : ", ";
                return (
                  <Text
                    key={idx}
                    onPress={() => {
                      // navigate(`/user-profile/${part.userUID}`);
                    }}
                    style={[
                      styles.activityText,
                      {
                        color: "#097396",
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {part.user}
                    {separator}
                  </Text>
                );
              })}
          </Text>
        </View>
        {new Date(act.date).getTime() >= now && (
          <View>
            {act.participants.some(
              (participant) => participant.email === "amailtoranjith@gmail.com"
            ) ? (
              <View>
                <Text>Génial, vous participez à cet événement !</Text>
                <Text style={{ fontSize: 12 }}>
                  si vous changez d'avis, vous pouvez l'annuler
                </Text>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={async () => {
                    const updatedParticipants = act.participants.filter(
                      (participant) =>
                        participant.email !== "amailtoranjith@gmail.com"
                    );

                    const actDocRef = doc(db, "activities", act.uid + act.id);
                    const userDoc = await getDoc(actDocRef);
                    if (userDoc.exists()) {
                      await updateDoc(actDocRef, {
                        participants: updatedParticipants,
                      });

                      //Removing from participated
                      const userDocRef = doc(
                        db,
                        "users",
                        "YDmNFX3RGsO9d2vEllwT7ItrfX82"
                      );
                      const userDoc = await getDoc(userDocRef);
                      if (userDoc.exists()) {
                        await updateDoc(userDocRef, {
                          participated: arrayRemove(act.id),
                        });
                      }

                      const updatedAct = {
                        ...act,
                        participants: updatedParticipants,
                      };
                      setAct(updatedAct);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Annuler</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.attendButton, styles.notAttending]}
                onPress={async () => {
                  // console.log(auth.currentUser.displayName);
                  const updatedParticipants = [
                    ...act.participants,
                    {
                      user: "Ranjit",
                      email: "amailtoranjith@gmail.com",
                      userUID: "YDmNFX3RGsO9d2vEllwT7ItrfX82",
                    },
                  ];

                  const actDocRef = doc(db, "activities", act.uid + act.id);
                  const actDoc = await getDoc(actDocRef);
                  if (actDoc.exists()) {
                    await updateDoc(actDocRef, {
                      participants: updatedParticipants,
                    });
                    const updatedAct = {
                      ...act,
                      participants: updatedParticipants,
                    };
                    setAct(updatedAct);
                  }

                  // adding to participated
                  const userDocRef = doc(
                    db,
                    "users",
                    "YDmNFX3RGsO9d2vEllwT7ItrfX82"
                  );
                  const userDoc = await getDoc(userDocRef);
                  if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const participatedActivities = [
                      ...userData.participated,
                      act.id,
                    ];
                    await updateDoc(userDocRef, {
                      participated: participatedActivities,
                    });
                  }
                }}
              >
                <Text style={styles.buttonText}>Participer</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  activityDescriptionContainer: {
    marginHorizontal: 30,
  },
  activityDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  activityText: {
    fontSize: 18,
    marginTop: 5,
  },
  attendButton: {
    backgroundColor: "#097396",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default EachSortie;
