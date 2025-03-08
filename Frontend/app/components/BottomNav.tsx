import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function DashboardScreen() {
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}

export default function BottomNav() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="dashboard"
        component={DashboardScreen}
        // options={{ tabBarIcon: () => <Icon name="home" size={20} /> }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        // options={{ tabBarIcon: () => <Icon name="person" size={20} /> }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        // options={{ tabBarIcon: () => <Icon name="settings" size={20} /> }}
      />
    </Tab.Navigator>
  );
}
