import { StyleSheet, Text, View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React, { useState, useEffect } from "react";

import Sorties from "../Screens/Sorties";

import EachSortie from "../Screens/EachSortie";

import UserProfile from "../Screens/UserProfile";
import Profile from "../Screens/Profile";
import MySorties from "../ScreensForProfile/MySorties";
import Organise from "../ScreensForProfile/Organise";
import MyParticipations from "../ScreensForProfile/MyParticipations";
import Settings from "../ScreensForProfile/Settings";

// import { signedUser } from "../Firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Login from "../ScreenComponents/Login";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/config";
import Signup from "../ScreenComponents/Signup";

const StackNavigationProfile = () => {
  const Stack = createNativeStackNavigator();

  const [signedUser, setSignedUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setSignedUser(
        user
          ? {
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              uid: user.uid,
            }
          : null
      );
    });
  }, []);

  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   async function fetchUserData() {
  //     if (signedUser) {
  //       const userDocRef = doc(db, "users", signedUser.uid);
  //       const userDoc = await getDoc(userDocRef);
  //       if (userDoc.exists()) {
  //         setUser(userDoc.data());
  //         // console.log(userDoc.data());
  //       }
  //     }
  //   }
  //   fetchUserData();
  //   console.log(user);
  // }, [signedUser]);

  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
        animationTypeForReplace: "push",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 70,
              }}
            >
              <Image
                source={require("../assets/Images/ici-laveyron.png")}
                style={{ height: 40, width: 40 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#226000",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Profil
              </Text>
            </View>
          ),
        }}
      />
      {signedUser ? (
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitleAlign: "center",
            headerTitle: () => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 70,
                }}
              >
                <Image
                  source={require("../assets/Images/ici-laveyron.png")}
                  style={{ height: 40, width: 40 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: "#226000",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Profil
                </Text>
              </View>
            ),
          }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitleAlign: "center",
            headerTitle: () => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 70,
                }}
              >
                <Image
                  source={require("../assets/Images/ici-laveyron.png")}
                  style={{ height: 40, width: 40 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: "#226000",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Profil
                </Text>
              </View>
            ),
          }}
        />
      )}
      <Stack.Screen
        name="MySorties"
        component={MySorties}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 70,
              }}
            >
              <Image
                source={require("../assets/Images/ici-laveyron.png")}
                style={{ height: 40, width: 40 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#226000",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Mes Sorties
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Organise"
        component={Organise}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 70,
              }}
            >
              <Image
                source={require("../assets/Images/ici-laveyron.png")}
                style={{ height: 40, width: 40 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#226000",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Organiser
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MyParticipations"
        component={MyParticipations}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 70,
              }}
            >
              <Image
                source={require("../assets/Images/ici-laveyron.png")}
                style={{ height: 40, width: 40 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#226000",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Mes Participations
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 70,
              }}
            >
              <Image
                source={require("../assets/Images/ici-laveyron.png")}
                style={{ height: 40, width: 40 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#226000",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Paramètres
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default StackNavigationProfile;
