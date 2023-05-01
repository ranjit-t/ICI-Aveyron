import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db, signedUser, auth } from "../Firebase/config";
import { useNavigation } from "@react-navigation/native";

const EachSortie = ({ route }) => {
  const navigation = useNavigation();

  const eventID = route.params.eventID;
  const [act, setAct] = useState([]);
  const now = new Date().getTime(); // get the current time

  const [commented, setCommented] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleComment = async () => {
    if (newComment) {
      const updatedComments = [
        ...act.comments,
        {
          user: "Ranjit",
          userUID: "YDmNFX3RGsO9d2vEllwT7ItrfX82",
          comment: newComment,
          time: new Date().toLocaleString(),
        },
      ];

      const actDocRef = doc(db, "activities", act.uid + act.id);
      const actDoc = await getDoc(actDocRef);
      // console.log(actDoc.data());
      if (actDoc.exists()) {
        await updateDoc(actDocRef, {
          comments: updatedComments,
        });
      }
      // setActivities(activitiesFetchData);
      const updatedAct = { ...act, comments: updatedComments };
      setAct(updatedAct);
      setNewComment("");
      setCommented((prev) => !prev);
    }
  };

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
  }, [eventID, commented]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginVertical: 10 }}>
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
              navigation.navigate("UserProfile", {
                userUID: act.uid,
              });
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
          <Text style={{ flexDirection: "row", marginVertical: 10 }}>
            {act.participants &&
              act.participants.map((part, idx) => {
                const isLast = idx === act.participants.length - 1;
                const separator = isLast ? "" : ", ";
                return (
                  <Text
                    key={idx}
                    onPress={() => {
                      navigation.navigate("UserProfile", {
                        userUID: part.userUID,
                      });
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
              <View>
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
              </View>
            )}
          </View>
        )}

        {/* //Comments Section */}

        <View style={styles.commentSection}>
          <View style={styles.commentInput}>
            <TextInput
              style={styles.input}
              placeholder="Avez-vous des questions ou autre chose?"
              onChangeText={setNewComment}
              value={newComment}
            />
            <TouchableOpacity
              style={styles.commentInputButton}
              onPress={handleComment}
            >
              <Text style={styles.commentInputText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
          {act.comments?.length > 0 ? (
            act.comments
              .slice()
              .reverse()
              .map((com, index) => {
                return (
                  <View style={styles.eachComment} key={index}>
                    <View style={{ width: "100%" }}>
                      <Text
                        style={styles.commenterName}
                        onPress={() => {
                          navigation.navigate("UserProfile", {
                            userUID: com.userUID,
                          });
                        }}
                      >
                        {com.user} :{" "}
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "normal",
                            lineHeight: 24,
                          }}
                        >
                          {com.comment}
                        </Text>
                      </Text>
                      <View>
                        <Text style={styles.timeStamp}>{com.time}</Text>
                      </View>
                    </View>
                  </View>
                );
              })
          ) : (
            <View style={styles.eachComment} key={Math.random()}>
              <Text style={styles.noComment}>No comments</Text>
            </View>
          )}
        </View>
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
    fontSize: 20,
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
    width: 220,
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
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  commentSection: {
    marginTop: 20,
  },
  commentInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingLeft: 10,
    paddingVertical: 5,
    backgroundColor: "white",
  },

  commentInputText: {
    color: "white",
    fontWeight: "bold",
    padding: 5,
    borderRadius: 5,
  },

  commentSection: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "rgba(128, 128, 128, 0.127)",
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  eachComment: {
    backgroundColor: "#afc5e858",
    marginTop: 15,
    padding: 10,
    paddingBottom: 20,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  commenterName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eachCommentText: {
    marginLeft: 10,
    lineHeight: 3,
  },
  timeStamp: {
    position: "absolute",
    right: 0,
    top: 0,
    color: "#424141",
  },
  commentInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    width: "100%",
  },

  commentInputButton: {
    backgroundColor: "#008cba",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default EachSortie;
