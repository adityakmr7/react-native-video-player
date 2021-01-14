import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import { StackNavProps } from "..";
const { width: wWidth, height: wHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  mediaCard: {
    height: wWidth / 6,
    width: wWidth,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    paddingLeft: 5,
  },
});
const Home = ({ navigation }: StackNavProps<"home">) => {
  const [mediaFile, setMediaFile] = useState<MediaLibrary.Asset[]>([]);
  useEffect(() => {
    getMediaFiles();
  }, []);

  const getMediaFiles = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const options = {
      mediaType: MediaLibrary.MediaType.video,
    };
    if (status === "granted") {
      const media = await MediaLibrary.getAssetsAsync(options);
      const { assets } = media;

      setMediaFile(assets);
    } else {
      console.log("Ohh No Permissions Granted");
    }
  };

  return (
    <ScrollView>
      {mediaFile.map((item, index) => {
        return (
          <TouchableWithoutFeedback
            style={{ borderRadius: 5, borderColor: "grey" }}
            key={index}
            onPress={() => {
              navigation.navigate("video", {
                item,
              });
            }}
          >
            <View style={styles.mediaCard}>
              <View>
                <Text>{item.filename}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </ScrollView>
  );
};

export default Home;
