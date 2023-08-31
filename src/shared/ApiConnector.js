import { AppState } from "react-native";
let finalval = "-";
let fetchdata = null;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export async function callAPI(type, data, level = 0) {
    
  let contentType = null;
  let datatosend = null;
    
    if (finalval != "-") {
        
      return finalval;
    } else {
      if (Object.entries(data).length) {
        datatosend = new FormData();
        Object.entries(data).map(function ([key, value]) {
          datatosend.append(key, value);
        });
        contentType = "multipart/form-data";
      } else {
        datatosend = {};
        contentType = "application/json";
      }
      fetchdata = await fetch("https://socialcatfish.com/webapi/v1/" + type, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: datatosend,
      })
        .then((response) => {
          if (response.status >= 400 && response.status < 600) {
          }
          return response.json();
        })
        .then((responseData) => {

          if (AppState.currentState == "active") {
            return responseData;
          } else {
            finalval = responseData;
            return "run again";
          }
        })
        .catch((err) => {
          return "run again";
        });
      if (fetchdata == "run again") {
        return callAPI(type, data, 1);
      } else {
        return fetchdata;
      }
    }
  
}
