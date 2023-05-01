import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Homepage from "./Screens/Homepage";
import Profile from "./Screens/Profile";
import StackNavigationSorties from "./StackNavigation/StackNavigationSorties";
import StackNavigationStores from "./StackNavigation/StackNavigationStores";
import StackNavigationProfile from "./StackNavigationProfile.js/StackNavigationProfile";

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
            headerTitle: "AVEYRON-ICI",
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Nos Meilleures Adresses"
          component={StackNavigationStores}
          options={{
            headerShown: false,
            tabBarLabel: "Magasins",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="store" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="All Sorties"
          component={StackNavigationSorties}
          options={{
            headerShown: false,
            tabBarLabel: "Sorties",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="calendar-month"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="All Profile"
          component={StackNavigationProfile}
          options={{
            headerShown: false,
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

const styles = StyleSheet.create({});
