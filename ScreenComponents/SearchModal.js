import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";

import GestureRecognizer from "react-native-swipe-gestures";
import React, { useState } from "react";

const SearchModal = ({
  setSearchModalinStore,
  searchCity,
  searchCategory,
  setSearchCity,
  setSearchCategory,
}) => {
  const [open, setOpen] = useState(false);
  return (
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
              <View style={[styles.searchContainer, styles.selectCateogory]}>
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
              <View style={[styles.searchContainer, styles.selectCateogory]}>
                <Picker
                  style={styles.selectCateogory}
                  selectedValue={searchCategory}
                  onValueChange={(itemValue) => setSearchCategory(itemValue)}
                >
                  <Picker.Item label="----" value="" />
                  <Picker.Item label="Où manger" value="Où manger" />
                  <Picker.Item label="Où dormir" value="Où dormir" />
                  <Picker.Item label="Service" value="Service" />
                </Picker>
              </View>
              {/* <View style={[styles.searchContainer, styles.selectCateogory]}>
                <DateTimePicker display="spinner" />
              </View> */}
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    // setSearchCity("");
                    // setSelectedValue("");
                    setSearchModalinStore((prev) => !prev);
                    // searchModal = false;
                  }}
                >
                  <Text style={styles.pageButton}>Rechercher</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSearchCity("");
                    setSearchCategory("");
                    // setSearchModalinStore((prev) => !prev);
                    // searchModal = false;
                  }}
                >
                  <Text style={[styles.pageButton, styles.clearButton]}>
                    Effacer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
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

export default SearchModal;
