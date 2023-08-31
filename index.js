/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import { session } from './src/shared/sessions';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);

    let notify =
    {
      title: remoteMessage.notification.title,
      desc: remoteMessage.notification.body,
      type: "notification",
      beenSeen: false,
      createdAt: new Date(),
      image: remoteMessage.notification.android.imageUrl?remoteMessage.notification.android.imageUrl:null
    };
    // let date = (new Date(remoteMessage.sentTime));
    // console.log(notify)

    session(["notification"]).then((response) => {
        console.log(JSON.parse(response.notification))
        if(response.notification==null){
            session("notification", JSON.stringify([notify]));
        }
        else{
            let allNotify = JSON.parse(response.notification)
            allNotify.push(notify)
            session("notification", JSON.stringify(allNotify));
        } 
    })
});

AppRegistry.registerComponent(appName, () => App);
