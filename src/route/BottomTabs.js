import * as React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Analyze from '../screens/Analyze';
import History from '../screens/History';
import More from '../screens/More';
import colors from '../config/colors';
import Icon from '../components/Icon';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row',borderTopWidth:1,borderColor:colors.mobile_black_400,backgroundColor:colors.mobile_black_500 }}>
        <StatusBar backgroundColor={colors.mobile_black_500} barStyle={'dark-content'}/>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
            
        const icon = route.name == 'Analyze'?'search':route.name == 'History'?'warning':'guide'

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1,alignItems:'center',height:60 }}
            key={index}
          >
            <View style={{alignItems:'center'}}>
                {
                    isFocused?
                    <View style={{height:4,backgroundColor:colors.mobile_blue_100,width:100,marginBottom:5}}/>
                    :
                    <View style={{height:4,backgroundColor:colors.mobile_black_500,width:20,marginBottom:5}}/>
                }
                
                <Icon name={icon} strokeWidth={isFocused ? 3:1} size={24} color={isFocused ? colors.mobile_blue_100 : colors.mobile_black_200}/>
            <Text style={{ color: isFocused ? colors.mobile_blue_100 : colors.mobile_black_200,fontSize:12}}>
              {label}
            </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
      <Tab.Navigator 
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown:false,
        lazy:true
      }}
      >
        <Tab.Screen name="Analyze" component={Analyze} options={{unmountOnBlur:true}} />
        <Tab.Screen name="History" component={History} options={{unmountOnBlur:true}} />
        <Tab.Screen name="More" component={More} options={{unmountOnBlur:true}} />
      </Tab.Navigator>
  );
}