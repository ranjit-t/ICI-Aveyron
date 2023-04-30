import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { StoresData } from "../assets/Data/StoresData";

const EachStore = ({ route }) => {
  const storeID = route.params.storeID;

  const currentStore = StoresData.filter(
    (store) => store.storeID === storeID
  )[0];

  //   console.log(currentStore[0]);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{currentStore.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default EachStore;
