import React, { useEffect, useState } from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import { StackNavProps } from "..";
import { Video as VideoPlayer } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import * as MediaLibrary from "expo-media-library";
import { Feather as Icon } from "@expo/vector-icons";
import {
  RectButton,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
const { width: wWidth, height: wHeight } = Dimensions.get("window");

const Video = ({ navigation, route }: StackNavProps<"video">) => {
  const { item } = route.params;
  const [videoInfo, setVideoInfo] = useState<MediaLibrary.Asset | null>(null);

  useEffect(() => {
    setVideoInfo(item);
  }, [item]);
  const [play, setPlay] = useState(false);
  const [showStatus, setShowStatus] = useState(true);

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
    <View style={styles.rootView}>
      <StatusBar hidden={showStatus} />
      <View style={{ flex: 1 }}>
        <VideoPlayer
          style={StyleSheet.absoluteFill}
          source={{ uri: item.uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={play}
          isLooping
        />
        <View
          style={{
            backgroundColor: "transparent",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100%",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={{ height: "100%", width: "100%" }}
            onPress={() => setPlay(!play)}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                {!play ? <Icon name="play" size={50} color={"white"} /> : null}
              </View>
            </View>
          </TouchableOpacity>
          {/* Top TaskBar */}
          <View
            style={{
              position: "absolute",
              top: 0,
              height: 60,
              backgroundColor: "black",
              width: "100%",
            }}
          >
            <View
              style={{
                height: "100%",
                flexDirection: "row",
                paddingTop: 15,
              }}
            >
              <View>
                <Icon name="arrow-left" size={30} color="white" />
              </View>
              <View style={{ paddingLeft: 15, paddingTop: 5 }}>
                <Text style={{ color: "white" }}>{videoInfo?.filename}</Text>
              </View>
            </View>
          </View>
          {/* End Top TaskBar */}
          {/* Bottom TaskBar */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: 60,
              backgroundColor: "black",
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View>
                <Icon name="skip-back" size={50} color="white" />
              </View>
              <View>
                {play ? (
                  <Icon name="pause" size={50} color="white" />
                ) : (
                  <Icon name="play" size={50} color="white" />
                )}
              </View>
              <View>
                <Icon name="skip-forward" size={50} color="white" />
              </View>
            </View>
          </View>
          {/* End Bottom TaskBar */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
    alignSelf: "stretch",
  },
});

export default Video;
