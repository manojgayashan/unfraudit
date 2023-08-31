import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
// import * as Device from "expo-device";

const storeCoordinates = async (coordinates, screenName, location) => {
  try {
    const existingData = await AsyncStorage.getItem("coordinates");
    const existingCoordinates = existingData ? JSON.parse(existingData) : [];

    const screenDimensions = Dimensions.get("window");
    // const deviceModel = Device;

    const newData = [
      ...existingCoordinates,
      {
        coordinates,
        screenName,
        location,
        screenDimensions,
        // device: deviceModel,
      },
    ];

    console.log(newData);

    // await AsyncStorage.setItem("coordinates", JSON.stringify(newData));
    console.log("Coordinates stored successfully!");
  } catch (error) {
    console.log("Failed to store coordinates:", error);
  }
};

const sendTouchPointsToAPI = async (sendFrequency = 10000) => {
  try {
    const storedData = await AsyncStorage.getItem("coordinates");

    if (storedData) {
      const touchPoints = JSON.parse(storedData);

      // TODO: Replace with API endpoint
      const apiEndpoint = "";

      console.log(touchPoints);

      // TODO: Implement your request logic to send touch points to the API
      // Use touchPoints array for sending the data to the API

      await AsyncStorage.removeItem("coordinates");

      console.log("Touch points sent to API successfully!");
    }
  } catch (error) {
    console.log("Failed to send touch points to API:", error);
  } finally {
    setTimeout(() => {
      sendTouchPointsToAPI(sendFrequency);
    }, sendFrequency);
  }
};

const checkAndSendTouchPointsOnAppStart = () => {
  sendTouchPointsToAPI();
  // ...Other app initialization logic...
};

export {
  storeCoordinates,
  sendTouchPointsToAPI,
  checkAndSendTouchPointsOnAppStart,
};
