import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { StoresData } from "../assets/Data/StoresData";
import { ImageSlider } from "react-native-image-slider-banner";
import { ScrollView } from "react-native-gesture-handler";

const EachStore = ({ route }) => {
  const storeID = route.params.storeID;

  const currentStore = StoresData.filter(
    (store) => store.storeID === storeID
  )[0];

  //   console.log(currentStore[0]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>{currentStore.name}</Text>
        <View style={styles.imageSlider}>
          <ImageSlider
            data={[
              {
                img: currentStore.photos[0],
              },
              {
                img: currentStore.photos[1],
              },
              {
                img: currentStore.photos[2],
              },
            ]}
            autoPlay={false}
            timer={4000}
            // onItemChanged={(item) => console.log("item", item)}
            closeIconColor="#fff"
          />
        </View>
        <View style={styles.storeDescription}>
          <Text style={styles.storeDescriptionHeading}>Type : </Text>
          <Text style={styles.storeText}>{currentStore.type}</Text>
        </View>
        <View style={{ marginHorizontal: 20, alignItems: "center" }}>
          <Text style={styles.storeDescriptionHeading}>Description: </Text>
          <Text style={styles.storeText}>{currentStore.description}</Text>
        </View>
        <View style={styles.storeDescription}>
          <Text style={styles.storeDescriptionHeading}>City : </Text>
          <Text style={styles.storeText}>{currentStore.city}</Text>
        </View>
        <View style={styles.storeDescription}>
          <Text style={styles.storeDescriptionHeading}>Timings</Text>
        </View>
        <View style={styles.storeDescription}>
          <Text style={styles.storeDescriptionHeading}>Lundi : </Text>
          <Text style={styles.storeText}>{currentStore.lundi}</Text>
        </View>
        <View style={styles.storeDescription}>
          <Text style={styles.storeDescriptionHeading}>Mardi : </Text>
          <Text style={styles.storeText}>{currentStore.mardi}</Text>
        </View>
        <View style={styles.storeDescription}>
          <Text style={styles.storeDescriptionHeading}>Mercredi : </Text>
          <Text style={styles.storeText}>{currentStore.mercredi}</Text>
        </View>
        <View style={styles.storeDescription}>
          <Text style={styles.storeDescriptionHeading}>Jeudi : </Text>
          <Text style={styles.storeText}>{currentStore.jeudi}</Text>
        </View>
        <View style={styles.storeDescription}>
          <Text style={styles.storeDescriptionHeading}>Vendredi : </Text>
          <Text style={styles.storeText}>{currentStore.vendredi}</Text>
        </View>
        <View style={styles.storeDescription}>
          <Text style={styles.storeDescriptionHeading}>Samedi : </Text>
          <Text style={styles.storeText}>{currentStore.samedi}</Text>
        </View>
        <View style={styles.storeDescription}>
          <Text style={styles.storeDescriptionHeading}>Dimanche : </Text>
          <Text style={styles.storeText}>{currentStore.dimanche}</Text>
        </View>
        <View style={{ marginHorizontal: 20, alignItems: "center" }}>
          <Text style={[styles.storeDescriptionHeading, { fontSize: 20 }]}>
            Menu
          </Text>
          <Image
            source={{ uri: currentStore.menuPhoto }}
            style={styles.imageMenu}
          />
        </View>
      </View>
    </ScrollView>
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
  imageSlider: {
    height: 300,
    // marginTop: -10,
  },
  storeHeading: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  storeDescription: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 18,
  },
  storeDescriptionHeading: {
    fontWeight: "bold",
    fontSize: 18,
  },
  imageMenu: {
    height: 400,
    width: 300,
    marginBottom: 10,
  },
  storeText: {
    fontSize: 18,
  },
});

export default EachStore;
