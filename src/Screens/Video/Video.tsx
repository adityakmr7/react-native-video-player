import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import { StackNavProps } from "..";
import { Video as VideoPlayer } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import * as MediaLibrary from "expo-media-library";
import { Feather as Icon } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import {
  RectButton,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
const { width: wWidth, height: wHeight } = Dimensions.get("window");
const ICON_SIZE = 30;

const Video = ({ navigation, route }: StackNavProps<"video">) => {
  const { item } = route.params;
  const [videoInfo, setVideoInfo] = useState<MediaLibrary.Asset | null>(null);
  const [showStatus, setShowStatus] = useState(true);
  const [seekPosition, setSeekPosition] = useState<number>(0);
  const [maxSeek, setMaxSeek] = useState(0);
  const [play, setPlay] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    setVideoInfo(item);
  }, [item]);

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
  const _playBackStatus = async (status: any) => {
    const {
      androidImplementation,
      didJustFinish,
      durationMillis,
      isBuffering,
      isLoaded,
      isLooping,
      isMuted,
      isPlaying,
      positionMillis,
      progressUpdateIntervalMillis,
      rate,
      shouldCorrectPitch,
      shouldPlay,
      uri,
      volume,
    } = status;

    setSeekPosition(positionMillis);
    setMaxSeek(durationMillis);
  };

  const _convertMiliToMS = (value: number) => {
    const totalSecond = value / 1000;
    const seconds = Math.floor(totalSecond % 60);
    const minutes = Math.floor(totalSecond / 60);
    const padWithZero = (v: number) => {
      const string = v.toString();
      if (v < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  };
  const _sliderValueChange = (value: any) => {
    console.log("_sliderVal", value);

    const v = parseInt(value);
  };
  const _refFunction = async (component: any) => {
    console.log("component", component);
  };

  return (
    <View style={styles.rootView}>
      <StatusBar hidden={showStatus} />
      <View style={{ flex: 1 }}>
        <VideoPlayer
          ref={_refFunction}
          style={StyleSheet.absoluteFill}
          source={{ uri: item.uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={play}
          isLooping
          onPlaybackStatusUpdate={_playBackStatus}
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="arrow-left" size={30} color="white" />
                </TouchableOpacity>
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
              height: 80,
              backgroundColor: "black",
              width: "100%",
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "white" }}>
                  {_convertMiliToMS(seekPosition)}
                </Text>
                <Text style={{ color: "white" }}>
                  {_convertMiliToMS(maxSeek)}
                </Text>
              </View>

              <Slider
                onValueChange={_sliderValueChange}
                style={{ width: "100%", height: 10 }}
                minimumValue={0}
                maximumValue={maxSeek}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={seekPosition}
              />
            </View>
            <View
              style={{
                paddingTop: 10,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View>
                <Icon name="skip-back" size={ICON_SIZE} color="white" />
              </View>
              <View>
                <TouchableOpacity onPress={() => setPlay(!play)}>
                  {play ? (
                    <Icon name="pause" size={ICON_SIZE} color="white" />
                  ) : (
                    <Icon name="play" size={ICON_SIZE} color="white" />
                  )}
                </TouchableOpacity>
              </View>
              <View>
                <Icon name="skip-forward" size={ICON_SIZE} color="white" />
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
