import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useActivities from "../assets/Data/AllActivities";
import { signedUser, db } from "../Firebase/config";
import bell from "../assets/Images/notification-png.png";

import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Alert } from "react-native";

function MyParticipations() {
  const navigation = useNavigation();

  const allActivities = useActivities();

  const now = new Date().getTime(); // get the current time

  const filteredActivities = allActivities.filter((activity) => {
    const participants = activity.participants;
    return participants.some(
      (participant) => participant.email === "amailtoranjith@gmail.com"
    );
  });

  const pastActivities = filteredActivities.filter(
    (act) => new Date(act.date).getTime() < now
  );
  const upcomingActivities = filteredActivities.filter(
    (act) => new Date(act.date).getTime() >= now
  );

  const handleDelete = async (signedUserUID, actID) => {
    // alert("hello");
    // const activityId = signedUserUID + actID;
    // const confirmed = window.confirm(
    //   "Are you sure you want to delete this activity?"
    // );
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this activity?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            // Delete the activity here
          },
        },
      ]
    );
    // if (confirmed) {
    //   // // Delete the activity from the Firestore database
    //   const ref = doc(db, "activities", activityId);
    //   await deleteDoc(ref);
    //   // Remove actID from the organized array in the users collection
    //   const userDocRef = doc(db, "users", signedUserUID);
    //   const userDoc = await getDoc(userDocRef);
    //   if (userDoc.exists()) {
    //     await updateDoc(userDocRef, { organized: arrayRemove(actID) });
    //   }
    //   // localStorage.removeItem("allActivities");
    //   window.location.reload();
    //   // // navigate("/profile");
    // }
  };
  return (
    <ScrollView
      style={styles.myActivitiesPage}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.myActivitiesPage}>
        {upcomingActivities.length > 0 && (
          <View style={styles.myActivitiesList}>
            <Text style={styles.heading}>Activités à venir</Text>
            {upcomingActivities.map((act, indx) => {
              return (
                <TouchableOpacity
                  key={indx}
                  style={styles.activityMap}
                  onPress={() => {
                    navigation.navigate("All Sorties", {
                      screen: "SingleSortie",
                      params: {
                        eventID: act.id,
                      },
                    });
                  }}
                >
                  <Text>
                    <Text style={styles.boldText}>{act.name}</Text>
                  </Text>
                  <Text style={styles.normalText}>{act.date}</Text>
                  <Text style={styles.normalText}>{act.city}</Text>

                  <TouchableOpacity style={styles.notifications}>
                    <Image source={bell} style={styles.bellIcon} />
                    <Text style={styles.normalText}>{act.comments.length}</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {pastActivities.length > 0 && (
          <View style={styles.myActivitiesList}>
            <Text style={styles.heading}>Activités passées</Text>
            {pastActivities.map((act, indx) => {
              return (
                <TouchableOpacity
                  key={indx * indx}
                  style={[styles.activityMap, styles.pastActivities]}
                  onPress={() => {
                    navigation.navigate("All Sorties", {
                      screen: "SingleSortie",
                      params: {
                        eventID: act.id,
                      },
                    });
                  }}
                >
                  <Text>
                    <Text style={[styles.boldText, styles.pastText]}>
                      {act.name}
                    </Text>
                  </Text>
                  <Text style={[styles.normalText, styles.pastText]}>
                    {act.date}
                  </Text>
                  <Text style={[styles.normalText, styles.pastText]}>
                    {act.city}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {upcomingActivities.length === 0 && pastActivities.length === 0 && (
          <View style={styles.noActivity}>
            <Text>Vous n'avez rien organisé jusqu'à présent </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                // navigate("/create-activity");
              }}
            >
              <Text style={styles.addButtonText}>Créer des sorties</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  myActivitiesPage: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  myActivitiesList: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  activityMap: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    marginBottom: 10,
    position: "relative",
    backgroundColor: "#226000",
  },
  boldText: {
    fontWeight: "bold",
    color: "white",
    marginVertical: 15,
  },
  normalText: {
    color: "white",
    marginVertical: 5,
  },
  pastText: {
    color: "#4a4949",
  },
  deleteActivity: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
  },
  notifications: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: "45%",
  },
  bellIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  pastActivities: {
    // opacity: 0.5,
    backgroundColor: "#baffdb",
  },
  noActivity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#008080",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
  },
});

export default MyParticipations;
