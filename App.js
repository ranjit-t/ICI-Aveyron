import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
          name="Stores"
          component={Stores}
          options={{
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
            tabBarLabel: "Profile",

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
});
