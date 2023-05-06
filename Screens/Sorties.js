import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import useActivities from "../assets/Data/AllActivities";
// import AntIcon from "react-native-vector-icons/AntDesign";

import DateTimePicker from "@react-native-community/datetimepicker";

const Sorties = () => {
  const [searchCity, setSearchCity] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    const formattedDate = value
      .toLocaleDateString("en-UK", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");

    setSearchDate(formattedDate);
    // alert(searchDate);
    setDatePicker(false);
  }

  const { width, height } = useWindowDimensions();

  const allActivities = useActivities();
  const now = new Date().getTime();

  const navigation = useNavigation();

  const upcomingActivities = allActivities
    .filter((act) => new Date(act.date).getTime() >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const activitiesFilteredList = upcomingActivities.filter(
    (act) =>
      act.city.toLowerCase().includes(searchCity.toLowerCase()) &&
      act.date.includes(searchDate)
  );

  return (
    <View style={styles.container}>
      <View style={styles.MainContainer}>
        <View style={[styles.searchContainer, styles.selectCateogory]}>
          <Picker
            style={styles.selectCateogory}
            selectedValue={searchCity}
            onValueChange={(itemValue) => setSearchCity(itemValue)}
          >
            <Picker.Item label="-- Ville --" value="" />
            <Picker.Item label="Rodez" value="Rodez" />
            <Picker.Item label="Naucelle" value="Naucelle" />
          </Picker>
        </View>
        <View style={[styles.searchContainer, styles.selectCateogory]}>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.pageButton}>
              {searchDate ? searchDate : "-- Date --"}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              setSearchDate("");
              setSearchCity("");
            }}
          >
            <Text style={styles.pageButton}>Effacer</Text>
          </TouchableOpacity>
        </View>
        {datePicker && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onDateSelected}
            style={styles.datePicker}
          />
        )}
      </View>
      {/* <View style={styles.selectSearch}>
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
      </View> */}

      {activitiesFilteredList.length > 0 ? (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={activitiesFilteredList}
            keyExtractor={(act) => act.name}
            renderItem={(act) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SingleSortie", {
                      eventID: act.item.id,
                    });
                  }}
                >
                  <View
                    style={
                      ([styles.eachActivity],
                      {
                        width: width,
                        backgroundColor: "#d5f2e2",
                        alignItems: "center",
                        marginVertical: 10,
                        // borderRadius: 20,
                        paddingVertical: 20,
                      })
                    }
                  >
                    <View style={styles.storeDescription}>
                      <Text style={styles.storeDescriptionHeading}>
                        {act.item.name}
                      </Text>
                    </View>
                    <View style={styles.storeDescription}>
                      <Text style={styles.activityText}>
                        {act.item.description.slice(0, 80) + "....."}
                      </Text>
                    </View>
                    <View style={styles.storeDescription}>
                      <Text style={styles.storeDescriptionHeading}>
                        Ville :{" "}
                      </Text>
                      <Text style={styles.activityText}>{act.item.city}</Text>
                    </View>
                    <View style={styles.storeDescription}>
                      <Text style={styles.storeDescriptionHeading}>
                        Date :{" "}
                      </Text>
                      <Text style={styles.activityText}>{act.item.date}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          ></FlatList>
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 20, marginHorizontal: 20, marginVertical: 50 }}
          >
            Rien trouvé pour votre recherche
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  eachActivity: {
    marginVertical: 10,
    alignItems: "center",
    // elevation: 2,
    // borderBottomColor: "white",
    // borderTopColor: "white",
    paddingBottom: 15,
    backgroundColor: "#baffdb",
    borderRadius: 20,
  },
  storeHeading: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 500,
  },
  storeDescription: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  storeDescriptionHeading: {
    fontWeight: 500,
    fontSize: 20,
  },

  activityText: {
    fontSize: 18,
  },

  selectSearch: {
    width: 60,
    height: 60,
    backgroundColor: "#226000",
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 10,
    borderRadius: 50,
  },
  MainContainer: {
    // flex: 1,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    // width: 400,
    flexDirection: "row",
  },

  text: {
    fontSize: 25,
    color: "red",
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
  searchContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  selectSearch: {
    width: 60,
    height: 60,
    backgroundColor: "#226000",
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 10,
    borderRadius: 50,
  },
  selectCateogory: {
    justifyContent: "center",
    width: 130,
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 5,
    height: 40,
  },
  pageButton: {
    fontSize: 17,
    height: 35,
    color: "black",
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default Sorties;
