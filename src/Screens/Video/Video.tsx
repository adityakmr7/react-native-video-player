import React from "react";
import { Text, View } from "react-native";
import { StackNavProps } from "..";

const Video = ({ navigation, route }: StackNavProps<"video">) => {
  const { item } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{item.filename}</Text>
    </View>
  );
};

export default Video;
