import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavProps } from "..";
import { Video as VideoPlayer } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

const Video = ({ navigation, route }: StackNavProps<"video">) => {
  const { item } = route.params;

  useEffect(() => {
    changeScreenOrientation();
    return () => {
      changeScreenToPotrait();
    };
  }, []);

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }
  async function changeScreenToPotrait() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }
  return (
    <VideoPlayer
      source={{ uri: item.uri }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={{ ...StyleSheet.absoluteFillObject }}
    />
  );
};

export default Video;
