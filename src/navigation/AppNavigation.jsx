import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigation from "./BottomTabNavigation";
import SongSearchContainer from "../../src/components/SongSearchScreen/SongSearchContainer";
import SongDetailContainer from "../../src/components/SongDetailScreen/SongDetailContainer";


const Stack = createStackNavigator();

export const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabNavigation">
        <>
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SongScreen"
            component={SongSearchContainer}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="SongDetail"
            component={SongDetailContainer}
            options={{ headerShown: false }}
          />
        </>
    </Stack.Navigator>
  );
};
