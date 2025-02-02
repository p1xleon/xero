import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#eee",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        tabBarStyle: {
          height: 65,
          backgroundColor: "#111",
          paddingTop: 5,
        },
        animation: "shift",
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <Icon size={26} name="view-dashboard" color={color} />,
        }}
      />
      <Tabs.Screen
        name="warStatus"
        options={{
          title: "War Status",
          tabBarIcon: ({ color }) => <Icon size={26} name="sword-cross" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Icon size={26} name="account-multiple-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
