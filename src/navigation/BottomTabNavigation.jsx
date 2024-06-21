import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../utils/Colors";
import { Entypo } from "@expo/vector-icons";
import SongSearchContainer from "../components/SongSearchScreen/SongSearchContainer"
import FavoriteSongContainer from "../components/FavoriteSongScreen/FavoriteSongContainer"

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY_COLOR,
        tabBarStyle: {
          backgroundColor: Colors.WHITE,
          color: Colors.WHITE,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Songs"
        component={SongSearchContainer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteSongContainer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="bookmark" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
