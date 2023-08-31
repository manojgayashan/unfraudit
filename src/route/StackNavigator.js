import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Onboardings from '../screens/Onboardings';
import BottomTabs from './BottomTabs';
import ExtraInfo from '../screens/ExtraInfo';
import LoadingResults from '../screens/LoadingResults';
import Results from '../screens/Results';
import Footer from '../components/Footer';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false,
            gestureDirection:'horizontal'
        }}
        // initialRouteName={onboarded ? 'BottomTabs' : 'Onboardings'}
        >
          <Stack.Screen name="Onboardings" component={Onboardings} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="ExtraInfo" component={ExtraInfo} />
          <Stack.Screen name="LoadingResults" component={LoadingResults} />
          <Stack.Screen name="Results" component={Results} />
          <Stack.Screen name="Footer" component={Footer} />
        </Stack.Navigator>
      );
}