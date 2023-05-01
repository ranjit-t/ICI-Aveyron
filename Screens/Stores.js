import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { StoresData } from "../assets/Data/StoresData";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import AntIcon from "react-native-vector-icons/AntDesign";
import GestureRecognizer from "react-native-swipe-gestures";

const Stores = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const [searchModalinStore, setSearchModalinStore] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.selectSearch}>
        <AntIcon
          name="search1"
          color={"white"}
          size={30}
          onPress={() => {
            setSearchModalinStore((prev) => !prev);
          }}
          style={{
            padding: 15,
          }}
        />
      </View>
      {searchModalinStore && (
        <GestureRecognizer
          style={{ flex: 1 }}
          // onSwipeUp={() => setSearchModalinStore((prev) => !prev)}
          onSwipeDown={() => setSearchModalinStore((prev) => !prev)}
        >
          <Modal animationType="slide" transparent={true}>
            <View
              style={{
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              <View style={styles.searchModal}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.modalSearchText}>Ville</Text>
                  <View
                    style={[styles.searchContainer, styles.selectCateogory]}
                  >
                    <Picker
                      style={styles.selectCateogory}
                      selectedValue={searchCity}
                      onValueChange={(itemValue) => setSearchCity(itemValue)}
                    >
                      <Picker.Item label="----" value="" />
                      <Picker.Item label="Rodez" value="Rodez" />
                      <Picker.Item label="Naucelle" value="Naucelle" />
                    </Picker>
                  </View>
                  <Text style={styles.modalSearchText}>Category</Text>
                  <View
                    style={[styles.searchContainer, styles.selectCateogory]}
                  >
                    <Picker
                      style={styles.selectCateogory}
                      selectedValue={selectedValue}
                      onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    >
                      <Picker.Item label="----" value="" />
                      <Picker.Item label="Où manger" value="Où manger" />
                      <Picker.Item label="Où dormir" value="Où dormir" />
                      <Picker.Item label="Service" value="Service" />
                    </Picker>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => {
                        // setSearchCity("");
                        // setSelectedValue("");
                        setSearchModalinStore((prev) => !prev);
                        searchModal = false;
                      }}
                    >
                      <Text style={styles.pageButton}>Rechercher</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setSearchCity("");
                        setSelectedValue("");
                        // setSearchModalinStore((prev) => !prev);
                        searchModal = false;
                      }}
                    >
                      <Text style={[styles.pageButton, styles.clearButton]}>
                        Effacer
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <View>
                    <TouchableOpacity
                      onPress={() => {
                        setSearchModalinStore((prev) => !prev);
                      }}
                    >
                      <Text style={[styles.pageButton, styles.cancelButton]}>
                        Back
                      </Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
              </View>
            </View>
          </Modal>
        </GestureRecognizer>
      )}

      <View style={{ marginBottom: 20 }}>
        <FlatList
          data={StoresData}
          keyExtractor={(store) => store.storeID}
          renderItem={(store) => {
            return (
              <View style={styles.eachStore}>
                <Pressable
                  // android_ripple={{ color: "#245953" }}
                  style={({ pressed }) =>
                    pressed
                      ? [styles.eachStore, styles.normalView, styles.pressed]
                      : [styles.normalView, styles.eachStore]
                  }
                  onPress={() => {
                    navigation.navigate("SingleStore", {
                      storeID: store.item.storeID,
                    });
                  }}
                >
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
                </Pressable>
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
    alignItems: "center",
  },
  image: {
    width: 400,
    height: 200,
  },
  eachStore: {
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
  selectSearch: {
    width: 60,
    height: 60,
    backgroundColor: "#008cba",
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 10,
    borderRadius: 50,
  },
  selectCateogory: {
    justifyContent: "center",
    width: 250,
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 5,
    height: 40,
  },
  pageButton: {
    fontSize: 20,
    height: 35,
    color: "white",
    backgroundColor: "#759242",
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: "#DA6A00",
  },
  searchModal: {
    height: 450,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 500,
    backgroundColor: "#008cba",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  modalSearchText: { fontSize: 20, color: "white", fontWeight: "bold" },
  activityText: {
    fontSize: 18,
  },
  normalView: {
    opacity: 1,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default Stores;
