import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { StoresData } from "../assets/Data/StoresData";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

const Stores = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchModal, setSearchModal] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.selectCateogory}>
          <TextInput
            placeholder="ville"
            style={{ marginLeft: 10, fontSize: 20 }}
            onChangeText={(itemValue) => setSearchCity(itemValue)}
            value={searchCity}
          />
        </View>
        <View style={[styles.searchContainer, styles.selectCateogory]}>
          <Picker
            style={styles.selectCateogory}
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="-- category --" value="" />
            <Picker.Item label="Option 2" value="option2" />
            <Picker.Item label="Option 3" value="option3" />
          </Picker>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              setSearchCity("");
              setSelectedValue("");
              setSearchModal((prev) => !prev);
            }}
          >
            <Text style={styles.pageButton}>Effacer</Text>
          </TouchableOpacity>
        </View>
      </View>
      {searchModal && (
        <Modal animationType="slide" transparent={true}>
          <View style={styles.searchModal}>
            <Text>Modal</Text>
            <TouchableOpacity
              onPress={() => {
                setSearchModal((prev) => !prev);
              }}
            >
              <Text style={styles.pageButton}>Back</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

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
  searchContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  selectCateogory: {
    justifyContent: "center",
    width: 150,
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 5,
    height: 35,
  },
  pageButton: {
    fontSize: 20,
    height: 35,

    color: "white",
    backgroundColor: "#008cba",
    padding: 5,
    borderRadius: 10,
  },
  searchModal: {
    height: 350,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    alignSelf: "center",
    // position: "absolute",
    // bottom: 0,
    // left: 0,
  },
});

export default Stores;
