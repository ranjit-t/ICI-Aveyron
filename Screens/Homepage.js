import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Logo } from "../assets/Images/ici-laveyron.png";

const Homepage = () => {
  return (
    <View style={styles.homeContainer}>
      <Image
        source={require("../assets/Images/ici-laveyron.png")}
        style={{ width: 150, height: 150, marginTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Homepage;
