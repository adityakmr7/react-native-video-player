import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import * as MediaLibrary from "expo-media-library";
import React from "react";
import Home from "./Home";
import Video from "./Video/Video";
interface indexProps {}

export type StackParams = {
  home: undefined;
  video: { item: MediaLibrary.Asset };
};
export type StackNavProps<T extends keyof StackParams> = {
  navigation: StackNavigationProp<StackParams, T>;
  route: RouteProp<StackParams, T>;
};
const AppStack = createStackNavigator<StackParams>();

const StackScreen = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="home"
          options={{ title: "XPlayer" }}
          component={Home}
        />
        <AppStack.Screen
          options={{ headerShown: false }}
          name="video"
          component={Video}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default StackScreen;
