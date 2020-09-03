import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavProps } from "..";

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
    <SafeAreaView>
      <ScrollView>
        {mediaFile.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              style={{ padding: 10, borderRadius: 5, borderColor: "grey" }}
              key={index}
              onPress={() => {
                navigation.navigate("video", {
                  item,
                });
              }}
            >
              <View>
                <View>
                  <Text>{item.filename}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
