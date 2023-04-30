import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import useActivities from "../assets/Data/AllActivities";
const Sorties = () => {
  const { width, height } = useWindowDimensions();

  const allActivities = useActivities();
  const now = new Date().getTime();

  const upcomingActivities = allActivities
    .filter((act) => new Date(act.date).getTime() >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  //   console.log(upcomingActivities);
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={upcomingActivities}
          keyExtractor={(act) => act.name}
          renderItem={(act) => {
            return (
              <View
                style={
                  ([styles.eachActivity],
                  {
                    width: width,
                    backgroundColor: "#afc5e858",
                    alignItems: "center",
                    marginBottom: 20,
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
                  <Text style={styles.storeDescriptionHeading}>Ville : </Text>
                  <Text style={styles.activityText}>{act.item.city}</Text>
                </View>
                <View style={styles.storeDescription}>
                  <Text style={styles.storeDescriptionHeading}>Date : </Text>
                  <Text style={styles.activityText}>{act.item.date}</Text>
                </View>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={[styles.pageButton, styles.cancelButton]}>
                    Plus d'options
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        ></FlatList>
      </View>
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
    backgroundColor: "#afc5e858",
  },
  storeHeading: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  storeDescription: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  storeDescriptionHeading: {
    fontWeight: "bold",
    fontSize: 20,
  },
  pageButton: {
    fontSize: 17,
    height: 35,
    color: "white",
    backgroundColor: "#008cba",
    padding: 5,
    paddingHorizontal: 7,
    borderRadius: 10,
    marginVertical: 15,
  },
  activityText: {
    fontSize: 18,
  },
});

export default Sorties;
