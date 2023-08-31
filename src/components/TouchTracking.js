import React, { Component } from "react";
import { ScrollView, View, Dimensions, Text } from "react-native";
import {
  PanGestureHandler,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
// import { getNavSettings } from "../utils/nav-functions";
import {
  storeCoordinates,
  sendTouchPointsToAPI,
  checkAndSendTouchPointsOnAppStart,
} from "../utils/touch-point-manager";
// import * as Device from "expo-device";
// import CustomAppBar from "./UIAppBar";
// import CustomBottomNavigation from "./UIBottomNavigation";

const TouchTracking = (WrappedComponent) => {
  class TouchTrackingComponent extends Component {
    constructor(props) {
      super(props);
      this.topNavRef = React.createRef();
      this.bottomNavRef = React.createRef();

      this.state = {
        mainTitle: "",
        scrollOffset: 0,
        topNavHeight: 0,
        headerInfo: {},
        headerImageIcon: true,
      };
      this.panRef = React.createRef();
      this.handleIconSize = this.handleIconSize.bind(this);
    }
    tap = Gesture.Tap().onStart((event) => {
      const touchCoordinates = {
        x: event.x,
        y: event.y + this.state.scrollOffset + this.state.topNavHeight,
      };
      const currentScreen = this.props.route.name;
      storeCoordinates(touchCoordinates, currentScreen, "body");
    });

    tapNavTop = Gesture.Tap().onStart((event) => {
      const touchCoordinates = { x: event.x, y: event.y };
      const currentScreen = this.props.route.name;
      storeCoordinates(touchCoordinates, currentScreen, "top navigation");
    });

    tapNavBottom = Gesture.Tap().onStart((event) => {
      const { width, height } = Dimensions.get("window");

      const touchCoordinates = { x: event.x, y: event.y + height };
      const currentScreen = this.props.route.name;
      storeCoordinates(touchCoordinates, currentScreen, "bottom navigation");
    });

    // handlePanResponderMove = (event) => {
    //   const { y, x } = event.nativeEvent;
    //   const { width, height } = Dimensions.get("window");
    //   const deviceModel = Device;

    //   console.log("screenDimensions:", width, height);
    //   console.log();
    //   console.log("device:", deviceModel.deviceName);
    //   console.log("Coordinates:", x, y);
    // };

    handleScroll = (event) => {
      const currentOffset = event.nativeEvent.contentOffset.y;
      this.setState({ scrollOffset: currentOffset });
    };

    calculateCenterCoordinates(object, scrollOffset) {
      var centerX = object.pageX + object.width / 2;
      var centerY = object.pageY + object.height / 2;

      return {
        x: centerX,
        y: scrollOffset + centerY,
      };
    }

    handleInputTouch(touch) {
      const coords = this.calculateCenterCoordinates(
        touch,
        this.state.scrollOffset
      );
      console.log("X", coords.x);
      console.log("Y", coords.y);

      const touchCoordinates = { x: coords.x, y: coords.y };
      const currentScreen = this.props.route.name;
      storeCoordinates(touchCoordinates, currentScreen, "input");
    }

    handleTopLayout = () => {
      if (this.topNavRef.current) {
        this.topNavRef.current.measure((x, y, width, height) => {
          this.setState({ topNavHeight: height });
        });
      }
    };

    handlerHeader(info) {
      this.setState({ headerInfo: info });
    }

    handleIconSize = () => {
      this.setState({ headerImageIcon: !this.state.headerImageIcon });
      console.log(this.state.headerImageIcon);
    };

    render() {
      const { tap } = this;
      const { scrollOffset, tapNavTop, headerImageIcon } = this.state;
      // const navSettings = getNavSettings(
      //   this.props.route.name,
      //   this.props.navigation,
      //   this.props.route.params,
      //   this.state.headerInfo,
      //   () => this.handleIconSize()
      // );

      // console.log(navSettings);

      return (
        <>
          <GestureDetector gesture={this.tapNavTop}>
            <View ref={this.topNavRef} onLayout={() => this.handleTopLayout()}>
              {/* <CustomAppBar {...navSettings[0]} /> */}
            </View>
          </GestureDetector>
          <GestureDetector gesture={this.tap} enabled>
            <View style={{ flex: 1 }}>
              <WrappedComponent
                handleInputTouch={(touch) => this.handleInputTouch(touch)}
                handleScroll={this.handleScroll}
                handlerHeader={(info) => this.handlerHeader(info)}
                headerImageIcon={headerImageIcon}
                {...this.props}
              />
            </View>
          </GestureDetector>
          {/* {navSettings[1] && (
            <GestureDetector gesture={this.tapNavBottom}>
              <View>
                <CustomBottomNavigation
                  navigation={this.props.navigation}
                  activatedTabID="SearchImage"
                ></CustomBottomNavigation>
              </View>
            </GestureDetector>
          )} */}
        </>
      );
    }
  }

  return TouchTrackingComponent;
};

export default TouchTracking;
