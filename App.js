import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { Logo } from "./assets/Images/ici-laveyron.png";

// import { Icon } from "@ant-design/react-native";
import AntIcon from "react-native-vector-icons/AntDesign";

import Homepage from "./Screens/Homepage";
import Stores from "./Screens/Stores";
import Sorties from "./Screens/Sorties";
import Profile from "./Screens/Profile";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#008cba",
          headerTintColor: "#008cba",
          headerTitleAlign: "center",
          tabBarStyle: {
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            paddingBottom: 6,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Homepage}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Nos Meilleures Adresses"
          component={Stores}
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("./assets/Images/ici-laveyron.png")}
                  style={{ height: 40, width: 40, marginRight: 5 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: "#008cba",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Nos Meilleures Adresses
                </Text>
              </View>
            ),
            tabBarLabel: "Magasins",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="store" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Sorties"
          component={Sorties}
          options={{
            tabBarLabel: "Sorties",
            tabBarIcon: ({ color }) => (
              // <AntIcon name="calendar" size={20} color={color} />
              <MaterialCommunityIcons
                name="calendar-month"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={Profile}
          options={{
            tabBarLabel: "Profil",

            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="shield-account"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  allTabs: {
    marginVertical: 100,
  },
});
