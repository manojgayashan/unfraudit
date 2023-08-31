import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
import Home from './src/screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/route/StackNavigator';

export default function App() {

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>    
  )
}