import { StyleSheet, Text, View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Stores from "../Screens/Stores";
import EachStore from "../Screens/EachStore";

const StackNavigationStores = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Stores"
        component={Stores}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 70,
              }}
            >
              <Image
                source={require("../assets/Images/ici-laveyron.png")}
                style={{ height: 40, width: 40 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#226000",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Nos Meilleures Adresses
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="SingleStore"
        component={EachStore}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/Images/ici-laveyron.png")}
                style={{ height: 40, width: 40 }}
              />
              {/* <Text></Text> */}
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default StackNavigationStores;
