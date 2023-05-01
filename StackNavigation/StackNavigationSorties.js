import { StyleSheet, Text, View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Sorties from "../Screens/Sorties";

import EachSortie from "../Screens/EachSortie";

import React from "react";
import UserProfile from "../Screens/UserProfile";

const StackNavigationSorties = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sorties"
        component={Sorties}
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
                  color: "#008cba",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Sorties
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="SingleSortie"
        component={EachSortie}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/Images/ici-laveyron.png")}
                style={{ height: 40, width: 40 }}
              />
              <Text
                style={
                  {
                    // fontSize: 16,
                    // color: "#008cba",
                    // fontSize: 20,
                    // fontWeight: "bold",
                  }
                }
              ></Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/Images/ici-laveyron.png")}
                style={{ height: 40, width: 40 }}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default StackNavigationSorties;
