import React from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import { StoresData } from "../assets/Data/StoresData";

const Stores = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Nos Meilleures Adresses</Text> */}
      <View>
        <FlatList
          data={StoresData}
          keyExtractor={(store) => store.storeID}
          renderItem={(store) => {
            return (
              <View style={styles.eachStore}>
                <Image
                  source={{ uri: store.item.photos[0] }}
                  style={styles.image}
                  //   style={{ width: 150, height: 100 }}
                />
                <Text style={styles.storeHeading}>{store.item.name}</Text>
                <View style={styles.storeDescription}>
                  <Text style={styles.storeDescriptionHeading}>Type : </Text>
                  <Text>{store.item.type}</Text>
                </View>
                <View style={styles.storeDescription}>
                  <Text style={styles.storeDescriptionHeading}>Ville : </Text>
                  <Text>{store.item.city}</Text>
                </View>
                <View style={styles.storeDescription}>
                  <Text style={styles.storeDescriptionHeading}>
                    Speciality :
                  </Text>
                  <Text>{store.item.speciality}</Text>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: 400,
    height: 200,
  },
  eachStore: {
    marginVertical: 10,
    alignItems: "center",
    elevation: 2,
    borderBottomColor: "white",
    borderTopColor: "white",

    paddingBottom: 15,
  },
  storeHeading: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  storeDescription: {
    flexDirection: "row",
    marginTop: 10,
  },
  storeDescriptionHeading: {
    fontWeight: "bold",
  },
});

export default Stores;
